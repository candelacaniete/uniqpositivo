import { isSupabaseConfigured, supabase } from './supabaseClient.js';

const LOCAL_SETTINGS_KEY = 'uniqpositivo_business_settings';
const SETTINGS_ID = 'main';

export const dayOptions = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
];

export const defaultBusinessSettings = {
  depositAlias: 'xxx',
  workingDays: [2, 3, 4, 5, 6],
  timeSlots: ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'],
};

function normalizeNumberArray(value, fallback) {
  const numbers = Array.isArray(value) ? value.map(Number).filter(Number.isFinite) : fallback;
  return [...new Set(numbers)].sort((a, b) => a - b);
}

function normalizeTimeSlots(value, fallback) {
  const slots = Array.isArray(value) ? value : fallback;
  return [...new Set(slots.map((slot) => String(slot).trim()).filter(Boolean))].sort();
}

function normalizeSettings(row) {
  return {
    depositAlias: row.deposit_alias || defaultBusinessSettings.depositAlias,
    workingDays: normalizeNumberArray(row.working_days, defaultBusinessSettings.workingDays),
    timeSlots: normalizeTimeSlots(row.time_slots, defaultBusinessSettings.timeSlots),
  };
}

function readLocalSettings() {
  try {
    return {
      ...defaultBusinessSettings,
      ...JSON.parse(window.localStorage.getItem(LOCAL_SETTINGS_KEY) || '{}'),
    };
  } catch {
    return defaultBusinessSettings;
  }
}

function writeLocalSettings(settings) {
  window.localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
}

export async function getBusinessSettings() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('business_settings').select('*').eq('id', SETTINGS_ID).maybeSingle();

    if (!error && data) return normalizeSettings(data);
    if (!error && !data) return defaultBusinessSettings;

    throw new Error(error.message || 'No pudimos cargar la configuración de horarios desde Supabase.');
  }

  return readLocalSettings();
}

export async function updateBusinessSettings(settings) {
  const normalized = {
    depositAlias: settings.depositAlias?.trim() || defaultBusinessSettings.depositAlias,
    workingDays: normalizeNumberArray(settings.workingDays, defaultBusinessSettings.workingDays),
    timeSlots: normalizeTimeSlots(settings.timeSlots, []),
  };

  if (!normalized.workingDays.length) {
    throw new Error('Seleccioná al menos un día laboral.');
  }

  if (!normalized.timeSlots.length) {
    throw new Error('Agregá al menos un horario disponible.');
  }

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('business_settings')
      .upsert({
        id: SETTINGS_ID,
        deposit_alias: normalized.depositAlias,
        working_days: normalized.workingDays,
        time_slots: normalized.timeSlots,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' })
      .select('*')
      .single();

    if (error) throw error;
    return normalizeSettings(data);
  }

  writeLocalSettings(normalized);
  return normalized;
}

export function isWorkingDay(date, workingDays) {
  if (!date) return true;
  const day = new Date(`${date}T00:00:00`).getDay();
  return workingDays.includes(day);
}
