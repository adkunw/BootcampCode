import React from 'react';

const About = () => {
  return (
    <div className="container about-section">
      <h1>About Me</h1>
      <div className="row mt-4 justify-content-center">
        {/* Kolom gambar profil */}
        <div className="col-md-4 text-center">
          <img
            src="/img/me.jpg" // Pastikan path gambar sudah sesuai
            alt="Foto Profil"
            className="img-fluid profile-image"
            style={{ width: '250px' }} // Gaya CSS menggunakan objek JavaScript
          />
        </div>
        {/* Kolom deskripsi profil */}
        <div className="col-md-6 profile-description">
          <h2>Aditya Kunto</h2>
          <p>
            Saya adalah seorang Technical Mentor di Walden Global Services yang
            berbasis di Bandung, Indonesia. Saya sangat menikmati berbagi
            pengetahuan di bidang pengembangan web, khususnya teknologi seperti
            Node.js dan React.js. Selain itu, saya juga tertarik untuk terus belajar
            dan berbagi dengan komunitas IT di sekitar.
          </p>
          <p>
            Saya percaya bahwa teknologi dapat menjadi alat yang kuat untuk
            memberdayakan orang lain dan menciptakan dampak positif.
          </p>
          {/* Tombol kontak */}
          <a
            href="https://www.instagram.com/geeksfarm"
            target="_blank"
            rel="noopener noreferrer" // Tambahkan rel untuk keamanan saat menggunakan target="_blank"
            className="contact-btn"
          >
            Hubungi Saya di Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
