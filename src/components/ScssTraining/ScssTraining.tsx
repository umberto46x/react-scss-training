export const ScssTraining = () => {
  return (
    <>
      <header className="ex1_header" id="header">
        <h1>First Exercise</h1>
        <nav>
          <ul>
            <li>
              <a href="#header">Home</a>
            </li>
            <li>
              <a href="#main">About Us</a>
            </li>
            <li>
              <a href="#footer">Contacts</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="ex1_main" id="main">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          obcaecati neque a nulla numquam deleniti placeat assumenda tempora
          voluptatem iure, voluptatibus fugiat provident quasi dolorem cumque,
          qui incidunt similique corrupti.
        </p>
      </main>

      <footer className="ex1_footer" id="footer">
        <h2>Contacts</h2>
        <ul>
          <li>Phone: 3412323456</li>
          <li>Email:pippo@gmail.com</li>
        </ul>
        <p>Website Made by umberto46x</p>
      </footer>
    </>
  );
};
