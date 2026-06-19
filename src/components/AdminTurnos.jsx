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
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [authorized, setAuthorized] = useState(() => window.sessionStorage.getItem('uniq_admin_session') === 'active');
  const [date, setDate] = useState(getToday());
  const [viewMode, setViewMode] = useState('day');
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const storageMode = getReservationStorageMode();
  const configuredUser = import.meta.env.VITE_ADMIN_USER || 'admin';
  const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'uniq-admin';

  const loadReservations = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      const data = await listReservations(viewMode === 'day' ? date : undefined);
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
  }, [authorized, date, viewMode]);

  const handleLogin = (event) => {
    event.preventDefault();
    if (credentials.username === configuredUser && credentials.password === configuredPassword) {
      setAuthorized(true);
      window.sessionStorage.setItem('uniq_admin_session', 'active');
      setMessage('');
      return;
    }

    setMessage('Usuario o contraseña incorrectos.');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('uniq_admin_session');
    setAuthorized(false);
    setCredentials({ username: '', password: '' });
    setReservations([]);
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
  const sortedReservations = [...reservations].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  if (!authorized) {
    return (
      <main className="min-h-screen bg-ink px-5 py-24 text-cream md:px-8">
        <form className="mx-auto max-w-md rounded-3xl border border-line bg-night p-6 shadow-soft-card" onSubmit={handleLogin}>
          <p className="mb-4 text-sm uppercase tracking-widest text-ash">Admin turnos</p>
          <h1 className="font-serif text-5xl font-semibold leading-none">Acceso interno</h1>
          <p className="mt-4 text-sm leading-6 text-ash">
            Ingresá con usuario y contraseña para ver reservas, confirmar turnos y controlar señas.
          </p>
          <label className="mt-8 block">
            <span className="mb-3 block text-sm font-semibold">Usuario</span>
            <input
              type="text"
              autoComplete="username"
              className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 outline-none transition focus:border-moss"
              value={credentials.username}
              onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))}
              placeholder={import.meta.env.VITE_ADMIN_USER ? 'Usuario privado' : 'Demo: admin'}
            />
          </label>
          <label className="mt-5 block">
            <span className="mb-3 block text-sm font-semibold">Contraseña</span>
            <input
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-line bg-ink/80 px-4 py-4 outline-none transition focus:border-moss"
              value={credentials.password}
              onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
              placeholder={import.meta.env.VITE_ADMIN_PASSWORD ? 'Contraseña privada' : 'Demo: uniq-admin'}
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
            <div className="flex rounded-full border border-line bg-night p-1">
              <button
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                  viewMode === 'day' ? 'bg-moss text-night' : 'text-cream'
                }`}
                onClick={() => setViewMode('day')}
              >
                Día
              </button>
              <button
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${
                  viewMode === 'all' ? 'bg-moss text-night' : 'text-cream'
                }`}
                onClick={() => setViewMode('all')}
              >
                Todas
              </button>
            </div>
            <input
              type="date"
              className="rounded-2xl border border-line bg-night px-4 py-3 outline-none focus:border-moss"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              disabled={viewMode === 'all'}
            />
            <button className="rounded-full border border-line px-5 py-3 text-sm font-bold uppercase tracking-widest" onClick={loadReservations}>
              Actualizar
            </button>
            <button className="rounded-full border border-line px-5 py-3 text-sm font-bold uppercase tracking-widest" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>

        {message ? <p className="mt-6 rounded-2xl border border-line bg-night p-4 text-sm text-ash">{message}</p> : null}

        <section className="mt-10 rounded-3xl border border-line bg-night/90 p-5 shadow-soft-card">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ash">Reservas</p>
              <h2 className="mt-1 font-serif text-4xl font-semibold">
                {viewMode === 'day' ? `Reservas del ${date}` : 'Todas las reservas'}
              </h2>
            </div>
            <p className="text-sm text-ash">{sortedReservations.length} reserva(s)</p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="admin-reservations-table w-full border-separate border-spacing-y-3 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-ash">
                  <th className="px-4 py-2">Servicio</th>
                  <th className="px-4 py-2">Clienta</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Turno</th>
                  <th className="px-4 py-2">Pago/seña</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedReservations.length > 0 ? (
                  sortedReservations.map((reservation) => (
                    <tr key={reservation.id} className="bg-ink/70">
                      <td className="rounded-l-2xl px-4 py-4">
                        <p className="font-semibold text-cream">{reservation.serviceName}</p>
                        <p className="mt-1 text-xs text-ash">
                          {reservation.servicePrice}
                          {reservation.serviceDeposit ? ` · Seña ${reservation.serviceDeposit}` : ''}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-cream">{reservation.clientName}</p>
                        <p className="mt-1 text-xs text-ash">
                          {reservation.clientPhone}
                          {reservation.clientInstagram ? ` · ${reservation.clientInstagram}` : ''}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-cream">{reservation.date}</td>
                      <td className="px-4 py-4 text-cream">{reservation.time}</td>
                      <td className="px-4 py-4">
                        <span className="rounded-full border border-line px-3 py-1 text-xs font-bold uppercase tracking-widest text-cream">
                          {statusLabel(reservation.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full border border-line px-3 py-1 text-xs font-bold uppercase tracking-widest text-cream">
                          {depositLabel(reservation.depositStatus)}
                        </span>
                      </td>
                      <td className="rounded-r-2xl px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="rounded-full border border-line px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-moss hover:text-moss"
                            onClick={() => handleUpdate(reservation, { depositStatus: 'paid', status: 'confirmed' })}
                          >
                            Seña pagada
                          </button>
                          <button
                            className="rounded-full border border-line px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-terracotta hover:text-terracotta"
                            onClick={() => handleUpdate(reservation, { status: 'cancelled' })}
                          >
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="rounded-2xl bg-ink/70 px-4 py-6 text-center text-ash" colSpan={7}>
                      No hay reservas para esta vista.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {viewMode === 'day' ? (
          <section className="mt-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ash">Agenda por horario</p>
            <div className="grid gap-4">
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
          </section>
        ) : null}

        {isLoading ? <p className="mt-6 text-sm text-ash">Cargando reservas...</p> : null}
      </div>
    </main>
  );
}
