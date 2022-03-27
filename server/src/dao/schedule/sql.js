module.exports = {
  registerSchedule:`
    INSERT INTO schedules (barber_id, user_id, date, time) 
    VALUES (:barber, :user, :date, :time)`,
};

