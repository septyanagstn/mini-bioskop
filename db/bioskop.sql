CREATE DATABASE IF NOT EXISTS bioskop_db;
USE bioskop_db;

-- 1. Tabel Users
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Movies
CREATE TABLE movies (
    id BIGINT UNSIGNED PRIMARY KEY,
    title VARCHAR(255) NOT null unique, 
    poster_url VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    starring VARCHAR(255),
    synopsis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Showtimes
CREATE TABLE showtimes (
    id BIGINT UNSIGNED PRIMARY KEY,
    movie_id BIGINT UNSIGNED NOT NULL,
    audi VARCHAR(50) NOT NULL,
    show_date DATE NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- 4. Tabel Orders
CREATE TABLE orders (
    id BIGINT UNSIGNED PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    showtime_id BIGINT UNSIGNED NOT NULL,
    total_price INT NOT NULL,
    status ENUM('PENDING', 'PAID') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);

-- 5. Tabel OrderSeats
CREATE TABLE order_seats (
  order_id BIGINT UNSIGNED NOT NULL,
  showtime_id BIGINT UNSIGNED NOT NULL,
  seat_number ENUM('A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5') NOT NULL,

  PRIMARY KEY (order_id, seat_number),
  UNIQUE KEY uq_order_seats_showtime_seat (showtime_id, seat_number),
  KEY idx_order_seats_showtime (showtime_id),

  CONSTRAINT fk_order_seats_order_showtime
    FOREIGN KEY (order_id, showtime_id)
    REFERENCES orders (id, showtime_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) 

-- ==========================================
-- SEEDER
-- ==========================================

-- SEED MOVIES
INSERT INTO movies (id, title, poster_url, director, starring, synopsis) VALUES 
(
	UUID_SHORT(),
	'AGENSI RUMAH TANGGA', 
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe--p-yYNacowI8BjTgBL_ItIF0miEiYPgeiBt-RglnMtJdpo5SBbQcjo&s=10', 
	'Naya Anindita', 
	'Enzy Storia, Afgansyah Reza', 
	'Katia (Enzy Storia) yang di-PHK perlu pekerjaan baru untuk membayar KPR, hingga memutuskan menjadi penyalur asisten rumah tangga (ART). Berbagai drama yang penuh romantika membuatnya bimbang antara mencari pekerjaan baru sesuai harapan ibunya, atau mempertahankan para ART yang sudah jadi keluarga baru baginya.'
),
(
	UUID_SHORT(),
	'IBU, BAGAIMANA AKU TANPAMU?', 
	'https://nos.jkt-1.neo.id/media.cinema21.co.id/movie-images/16IBAT.jpg', 
	'Herwin Novianto', 
	'Marsha Timothy, Fara Shakila', 
	'Setelah divonis hidupnya tak akan lama lagi, seorang ibu tunggal yang bekerja sebagai perancang gaun pengantin bertekad menghabiskan sisa waktunya untuk membahagiakan putrinya sekaligus mempersiapkannya agar mampu hidup mandiri.'
);


-- SEED SHOWTIMES
INSERT INTO showtimes (id, movie_id, audi, show_date, start_time, price) VALUES 
-- Agensi Rumah Tangga
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-09-30', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-09-30', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-09-30', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-01', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-01', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-02', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-02', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-03', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-03', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-04', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-04', '19:00', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-05', '14:20', 35000),
(UUID_SHORT(), 102101438586421248, 'Audi 1', '2026-10-05', '19:00', 35000),

-- Ibu, Bagaimana Aku Tanpamu?
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-09-30', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-09-30', '19:00', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-01', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-01', '19:00', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-02', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-02', '19:00', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-03', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-03', '19:00', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-04', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-04', '19:00', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-05', '14:20', 35000),
(UUID_SHORT(), 102101438586421249, 'Audi 2', '2026-10-05', '19:00', 35000);

