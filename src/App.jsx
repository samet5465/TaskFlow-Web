import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [gorevler, setGorevler] = useState(() => {
  const kayitliGorevler = localStorage.getItem("gorevler");
  return kayitliGorevler ? JSON.parse(kayitliGorevler) : [];
});

useEffect(() => {
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}, [gorevler]);

  const [yeniGorev, setYeniGorev] = useState("");

  const gorevEkle = () => {
    if (yeniGorev.trim() === "") return;

    setGorevler([...gorevler, yeniGorev]);
    setYeniGorev("");
  };

  const gorevSil = (index) => {
  setGorevler(gorevler.filter((_, i) => i !== index));
  };

  const gorevGuncelle = (index) => {
  const yeniBaslik = prompt(
    "Görevin yeni adını yaz:",
    gorevler[index]
  );

  if (yeniBaslik === null || yeniBaslik.trim() === "") {
    return;
  }

  setGorevler(
    gorevler.map((gorev, i) =>
      i === index ? yeniBaslik.trim() : gorev
    )
  );
};

  return (
    <div>
      <h1>TaskFlow Web</h1>
      <p>Görev Yönetim Uygulaması</p>

      <input
        type="text"
        placeholder="Yeni görev yaz..."
        value={yeniGorev}
        onChange={(e) => setYeniGorev(e.target.value)}
      />

      <button onClick={gorevEkle}>Görev Ekle</button>

      <h2>Görevlerim</h2>

      <ul>
        {gorevler.map((gorev, index) => (
         <li key={index}>
        {gorev}
        <button onClick={() => gorevGuncelle(index)}>
              Düzenle
           </button>
      <button onClick={() => gorevSil(index)}>
         Sil
       </button>
    </li>
        ))}
      </ul>
    </div>
  );
}

export default App;