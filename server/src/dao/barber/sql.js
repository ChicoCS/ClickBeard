module.exports = {
  getBarberSpecialties: `
    SELECT *
    FROM specialties_types s`,

  registerBarber:`
    INSERT INTO barbers (name, age, date_hiring) 
    VALUES (:name, :age, :date_hiring)`,

  getBarberByName:`
    SELECT * FROM barbers
    WHERE LOWER(name) = LOWER(:name)`,
  
  getBarberByUID:`
    SELECT * FROM barbers
    WHERE uid = :uid`,

  addBarberSpecialty:`
    INSERT INTO barbers_specialties (barber_id, specialty_id) 
    VALUES (:barber_id, :specialty_id)`,
  
  getBarberSpecialtiesById:`
    SELECT st.id, st.name 
    FROM barbers_specialties bs
    LEFT JOIN barbers b ON b.id = bs.barber_id
    LEFT JOIN specialties_types st ON st.id = bs.specialty_id
    WHERE b.id = :barber_id`,

  deleteBarberSpecialties: `
    DELETE FROM barbers_specialties 
    WHERE barber_id = :barber_id`,
  
  deleteBarber: `
    DELETE FROM barbers 
    WHERE uid = :uid`,

  getBarbersBySpecialty:`
    SELECT b.uid, b.name FROM clickbeard.barbers b 
    LEFT JOIN barbers_specialties bs ON bs.barber_id = b.id 
    WHERE bs.specialty_id = :specialty_id
  `,

  getUnavailableSchedulesBarberByBarberUID:`
    SELECT s.date, s.time FROM clickbeard.schedules s
    LEFT JOIN barbers b ON b.id = s.barber_id
    WHERE b.uid = :uid
    AND s.date = :date
    AND s.canceled = 0
  `,

  getTimeList:`
  SELECT tl.time FROM clickbeard.time_list tl
  `
};

