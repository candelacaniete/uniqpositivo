import { useEffect, useState } from 'react';
import { availableTimes } from '../data/services.js';
import { getReservationStorageMode, listReservations, updateReservation } from '../lib/reservations.js';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function statusLabel(status) {
  const labels = {
    pending_deposit: 'Pendiente de seña',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    rescheduled: 'Reprogramado',
  };

  return labels[status] || status;
}

function depositLabel(status) {
  const labels = {
    not_required: 'No requiere',
    pending: 'Pendiente',
    paid: 'Pagada',
    failed: 'Fallida',
  };

  return labels[status] || status;
}

export default function AdminTurnos() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [date, setDate] = useState(getToday());
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const storageMode = getReservationStorageMode();
  const configuredPin = import.meta.env.VITE_ADMIN_PIN || 'uniq-admin';

  const loadReservations = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const data = await listReservations(date);
      setReservations(data);
    } catch (error) {
      setMessage(error.message || 'No pudimos cargar las reservas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      loadReservations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, date]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (pin === configuredPin) {
      setAuthorized(true);
      setMessage('');
      return;
    }

    setMessage('PIN incorrecto.');
  };

  const handleUpdate = async (reservation, patch) => {
    setMessage('');
    try {
      await updateReservation(reservation.id, patch);
      await loadReservations();
    } catch (error) {
      setMessage(error.message || 'No pudimos actualizar la reserva.');
    }
  };

  const reservationsByTime = availableTimes.map((time) => ({
    time,
    reservation: reservations.find((item) => item.time === time),
  }));

  if (!authorized) {
    return (
      <main className="min-h-screen bg-ink px-5 py-24 text-cream md:px-8">
        <form className="mx-auto max-w-md rounded-3xl border border-line bg-night p-6 shadow-soft-card" onSubmit={handleLogin}>
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Admin turnos</p>
          <h1 className="font-serif text-5xl font-semibold leading-none">Ingresar</h1>
          <label className="mt-8 block">
            <span className="mb-3 block text-sm font-semibold">PIN</span>
            <input
              type="password"
              className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 outline-none transition focus:border-moss"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder={import.meta.env.VITE_ADMIN_PIN ? 'PIN privado' : 'Demo: uniq-admin'}
            />
          </label>
          <button className="mt-6 w-full rounded-full bg-accent px-6 py-4 text-sm font-bold uppercase tracking-widest text-night">
            Entrar
          </button>
          {message ? <p className="mt-4 text-sm text-ash">{message}</p> : null}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-cream md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-widest text-ash">Panel interno</p>
            <h1 className="font-serif text-5xl font-semibold leading-none md:text-7xl">Turnos y señas</h1>
            <p className="mt-4 text-sm text-ash">
              Modo: {storageMode === 'supabase' ? 'Supabase compartido' : 'demo local del navegador'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="date"
              className="rounded-2xl border border-line bg-night px-4 py-3 outline-none focus:border-moss"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <button className="rounded-full border border-line px-5 py-3 text-sm font-bold uppercase tracking-widest" onClick={loadReservations}>
              Actualizar
            </button>
          </div>
        </div>

        {message ? <p className="mt-6 rounded-2xl border border-line bg-night p-4 text-sm text-ash">{message}</p> : null}

        <div className="mt-10 grid gap-4">
          {reservationsByTime.map(({ time, reservation }) => (
            <article key={time} className="rounded-3xl border border-line bg-night/90 p-5 shadow-soft-card">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ash">{time}</p>
                  {reservation ? (
                    <>
                      <h2 className="mt-2 font-serif text-3xl font-semibold">{reservation.serviceName}</h2>
                      <p className="mt-2 text-sm leading-6 text-ash">
                        {reservation.clientName} · {reservation.clientPhone}
                        {reservation.clientInstagram ? ` · ${reservation.clientInstagram}` : ''}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ash">
                        {reservation.servicePrice}
                        {reservation.serviceDeposit ? ` · Seña ${reservation.serviceDeposit}` : ''} · {statusLabel(reservation.status)} · Seña{' '}
                        {depositLabel(reservation.depositStatus)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-ash">Horario libre</p>
                  )}
                </div>

                {reservation ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-full border border-line px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-moss hover:text-moss"
                      onClick={() => handleUpdate(reservation, { depositStatus: 'paid', status: 'confirmed' })}
                    >
                      Seña pagada
                    </button>
                    <button
                      className="rounded-full border border-line px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-moss hover:text-moss"
                      onClick={() => handleUpdate(reservation, { status: 'confirmed' })}
                    >
                      Confirmar
                    </button>
                    <button
                      className="rounded-full border border-line px-4 py-2 text-xs font-bold uppercase tracking-widest hover:border-terracotta hover:text-terracotta"
                      onClick={() => handleUpdate(reservation, { status: 'cancelled' })}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {isLoading ? <p className="mt-6 text-sm text-ash">Cargando reservas...</p> : null}
      </div>
    </main>
  );
}
