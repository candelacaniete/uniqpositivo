import { isSupabaseConfigured, supabase } from './supabaseClient.js';

const LOCAL_STORAGE_KEY = 'uniqpositivo_reservations';

function readLocalReservations() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeLocalReservations(reservations) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reservations));
}

function normalizeReservation(row) {
  return {
    id: row.id,
    serviceId: row.service_id,
    serviceName: row.service_name,
    servicePrice: row.service_price_label,
    serviceDeposit: row.service_deposit_label,
    clientName: row.client_name,
    clientPhone: row.client_phone,
    clientEmail: row.client_email,
    clientDni: row.client_dni,
    clientInstagram: row.client_instagram,
    date: row.reservation_date,
    time: row.reservation_time,
    status: row.status,
    depositStatus: row.deposit_status,
    depositAmount: row.deposit_amount,
    paymentReference: row.payment_reference,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

function toSupabaseInsert(payload) {
  return {
    service_id: payload.service.id,
    service_name: payload.service.name,
    service_price_label: payload.service.price,
    service_deposit_label: payload.service.deposit,
    client_name: payload.clientName,
    client_phone: payload.clientPhone,
    client_email: payload.clientEmail,
    client_dni: payload.clientDni,
    client_instagram: payload.clientInstagram || null,
    reservation_date: payload.date,
    reservation_time: payload.time,
    status: payload.service.depositAmount ? 'pending_deposit' : 'confirmed',
    deposit_status: payload.service.depositAmount ? 'pending' : 'not_required',
    deposit_amount: payload.service.depositAmount,
    notes: payload.notes || null,
  };
}

export async function listReservations(date) {
  if (isSupabaseConfigured) {
    let query = supabase.from('reservations').select('*').order('reservation_date', { ascending: true }).order('reservation_time');

    if (date) {
      query = query.eq('reservation_date', date);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data.map(normalizeReservation);
  }

  const reservations = readLocalReservations();
  return date ? reservations.filter((reservation) => reservation.date === date) : reservations;
}

export async function getBookedTimes(date) {
  const reservations = await listReservations(date);

  return reservations
    .filter((reservation) => ['pending_deposit', 'confirmed'].includes(reservation.status))
    .map((reservation) => reservation.time);
}

export async function createReservation(payload) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('reservations').insert(toSupabaseInsert(payload)).select('*').single();

    if (error) throw error;
    return normalizeReservation(data);
  }

  const reservations = readLocalReservations();
  const slotTaken = reservations.some(
    (reservation) =>
      reservation.date === payload.date &&
      reservation.time === payload.time &&
      ['pending_deposit', 'confirmed'].includes(reservation.status),
  );

  if (slotTaken) {
    throw new Error('Ese horario ya fue reservado.');
  }

  const reservation = {
    id: window.crypto?.randomUUID?.() || String(Date.now()),
    serviceId: payload.service.id,
    serviceName: payload.service.name,
    servicePrice: payload.service.price,
    serviceDeposit: payload.service.deposit,
    clientName: payload.clientName,
    clientPhone: payload.clientPhone,
    clientEmail: payload.clientEmail,
    clientDni: payload.clientDni,
    clientInstagram: payload.clientInstagram || null,
    date: payload.date,
    time: payload.time,
    status: payload.service.depositAmount ? 'pending_deposit' : 'confirmed',
    depositStatus: payload.service.depositAmount ? 'pending' : 'not_required',
    depositAmount: payload.service.depositAmount,
    paymentReference: null,
    notes: payload.notes || null,
    createdAt: new Date().toISOString(),
  };

  writeLocalReservations([...reservations, reservation]);
  return reservation;
}

export async function updateReservation(id, patch) {
  if (isSupabaseConfigured) {
    const dbPatch = {
      status: patch.status,
      deposit_status: patch.depositStatus,
      payment_reference: patch.paymentReference,
      notes: patch.notes,
      updated_at: new Date().toISOString(),
    };

    Object.keys(dbPatch).forEach((key) => {
      if (dbPatch[key] === undefined) delete dbPatch[key];
    });

    const { data, error } = await supabase.from('reservations').update(dbPatch).eq('id', id).select('*').single();
    if (error) throw error;
    return normalizeReservation(data);
  }

  const reservations = readLocalReservations();
  const updatedReservations = reservations.map((reservation) =>
    reservation.id === id ? { ...reservation, ...patch } : reservation,
  );

  writeLocalReservations(updatedReservations);
  return updatedReservations.find((reservation) => reservation.id === id);
}

export function getReservationStorageMode() {
  return isSupabaseConfigured ? 'supabase' : 'demo';
}
