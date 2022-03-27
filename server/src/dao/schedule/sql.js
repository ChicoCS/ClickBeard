module.exports = {
  registerSchedule: `
    INSERT INTO schedules (barber_id, user_id, date, time) 
    VALUES (:barber, :user, :date, :time)`,

  getSchedulesByClientUID: `
    SELECT s.uid AS schedule_id, u.uid AS user_id, b.uid AS barber_id, b.name AS barber_name, s.date, s.time FROM schedules s 
    LEFT JOIN users u ON u.id = s.user_id
    LEFT JOIN barbers b ON b.id = s.barber_id
    WHERE u.uid = :uid
    AND s.canceled = 0
    ORDER BY s.date DESC, s.time ASC`,
  
  getSchedules: `
    SELECT s.uid AS schedule_id, u.uid AS user_id, u.name as user_name, b.uid AS barber_id, b.name AS barber_name, s.date, s.time FROM schedules s 
    LEFT JOIN users u ON u.id = s.user_id
    LEFT JOIN barbers b ON b.id = s.barber_id
    WHERE s.canceled = 0
    ORDER BY s.date DESC, s.time ASC`,
};
