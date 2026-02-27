// pages/artisan/calendrier/index.jsx
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

export default function Calendrier() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Réparation fuite - Jean D.',
      start: '2024-01-15T10:00:00',
      end: '2024-01-15T12:00:00',
      backgroundColor: '#3b82f6'
    },
    {
      id: '2',
      title: 'Installation chauffe-eau - Marie M.',
      start: '2024-01-15T14:00:00',
      end: '2024-01-15T17:00:00',
      backgroundColor: '#10b981'
    },
    {
      id: '3',
      title: 'Dépannage électrique - Pierre D.',
      start: '2024-01-16T09:00:00',
      end: '2024-01-16T11:00:00',
      backgroundColor: '#f59e0b'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const handleEventDrop = (info) => {
    // Mettre à jour l'événement dans la base de données
    console.log('Événement déplacé:', info.event);
  };

  const handleEventClick = (info) => {
    // Afficher les détails de l'intervention
    console.log('Détails intervention:', info.event);
  };

  const toggleDisponibilite = (date, disponible) => {
    // Marquer un jour comme disponible/indisponible
    console.log('Jour:', date, disponible ? 'Disponible' : 'Indisponible');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600">Gérez vos interventions et disponibilités</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => toggleDisponibilite(new Date(), false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Marquer indisponible
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Nouvelle intervention
          </button>
        </div>
      </div>

      {/* Calendrier */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="timeGridWeek"
          locale={frLocale}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          dateClick={handleDateClick}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          height="auto"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          slotDuration="00:30:00"
        />
      </div>

      {/* Légende */}
      <div className="mt-6 flex items-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Intervention confirmée</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Intervention en cours</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">En attente</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Indisponible</span>
        </div>
      </div>

      {/* Modal pour ajouter une intervention */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nouvelle intervention</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Sélectionner un client</option>
                  <option>Jean Dupont</option>
                  <option>Marie Martin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Type d'intervention"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Début
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={selectedDate?.toISOString().slice(0, 16)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fin
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Adresse complète"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows="3"
                  placeholder="Informations supplémentaires..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Créer l'intervention
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}