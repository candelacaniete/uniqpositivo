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

function normalizeSettings(row) {
  return {
    depositAlias: row.deposit_alias || defaultBusinessSettings.depositAlias,
    workingDays: row.working_days || defaultBusinessSettings.workingDays,
    timeSlots: row.time_slots || defaultBusinessSettings.timeSlots,
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

    // If the settings table has not been created yet, keep the app usable with defaults.
    return defaultBusinessSettings;
  }

  return readLocalSettings();
}

export async function updateBusinessSettings(settings) {
  const normalized = {
    depositAlias: settings.depositAlias?.trim() || defaultBusinessSettings.depositAlias,
    workingDays: [...new Set(settings.workingDays.map(Number))].sort(),
    timeSlots: settings.timeSlots.map((slot) => slot.trim()).filter(Boolean),
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('business_settings')
      .upsert({
        id: SETTINGS_ID,
        deposit_alias: normalized.depositAlias,
        working_days: normalized.workingDays,
        time_slots: normalized.timeSlots,
        updated_at: new Date().toISOString(),
      })
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
