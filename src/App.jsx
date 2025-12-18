import { useRef, useState } from "react";

let file_diff = null;
let rankdiff = null;

function App() {
  const [selectid, setselectid] = useState(null);
  const [active, setactive] = useState("");
  const [piece, setpiece] = useState([
    { id: "p0", piece: "p", colorr: "w", file: 1, rank: 7 },
    { id: "p1", piece: "p", colorr: "w", file: 2, rank: 7 },
    { id: "p2", piece: "p", colorr: "w", file: 3, rank: 7 },
    { id: "p3", piece: "p", colorr: "b", file: 3, rank: 5 },
    {id:"p4",piece:"p",colorr:"w",file:4,rank:7}
  ]);

  function checker(file, rank) {
    const check = piece.filter((p) => p.file == file && p.rank == rank);
    if (check.length !== 0) return check;
    return null;
  }

  function handleclick(event) {
    const file_clicked = Math.ceil(event.clientX / 75);
    const rank_clicked = Math.ceil(event.clientY / 75);

    if (active === "active") {
      file_diff = null;
      rankdiff = null;

      if (selectid.piece === "p") {
        if (rank_clicked > selectid.rank) {
          alert("pawn can't move backwards");
          return;
        }

        if (file_clicked === selectid.file) {
          if (rank_clicked === selectid.rank - 2 && selectid.rank === 7) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission === null) {
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            } else {
              alert("cant move piece to that square");
            }
          }

          if (rank_clicked === selectid.rank - 1) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission === null) {
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            } else {
              alert("cant move piece to that square");
            }
          }
        } else {
          if (
            file_clicked === selectid.file + 1 &&
            rank_clicked === selectid.rank - 1
          ) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission !== null && permission[0].colorr !== selectid.colorr) {
              setpiece((prev) => prev.filter((p) => p.id !== permission[0].id));
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }

          if (
            file_clicked === selectid.file - 1 &&
            rank_clicked === selectid.rank - 1
          ) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission !== null && permission[0].colorr !== selectid.colorr) {
              setpiece((prev) => prev.filter((p) => p.id !== permission[0].id));
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }
        }
      }

      if (file_diff !== null && rankdiff !== null) {
        setpiece((prev) =>
          prev.map((p) =>
            p.id === selectid.id
              ? { ...p, file: file_diff, rank: rankdiff }
              : p
          )
        );
      }

      setactive("");
      setselectid(null);
    } else {
      const piece_exists = piece.find(
        (p) => p.file === file_clicked && p.rank === rank_clicked
      );
      if (piece_exists) {
        setselectid(piece_exists);
        setactive("active");
      }
    }
  }

  return (
    <>
      <svg
        onClick={(e) => {
          handleclick(e);
        }}
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="75" height="75" fill="#f0d9b5" />
        <rect x="75" y="0" width="75" height="75" fill="#b58863" />
        <rect x="150" y="0" width="75" height="75" fill="#f0d9b5" />
        <rect x="225" y="0" width="75" height="75" fill="#b58863" />
        <rect x="300" y="0" width="75" height="75" fill="#f0d9b5" />
        <rect x="375" y="0" width="75" height="75" fill="#b58863" />
        <rect x="450" y="0" width="75" height="75" fill="#f0d9b5" />
        <rect x="525" y="0" width="75" height="75" fill="#b58863" />

        <rect x="0" y="75" width="75" height="75" fill="#b58863" />
        <rect x="75" y="75" width="75" height="75" fill="#f0d9b5" />
        <rect x="150" y="75" width="75" height="75" fill="#b58863" />
        <rect x="225" y="75" width="75" height="75" fill="#f0d9b5" />
        <rect x="300" y="75" width="75" height="75" fill="#b58863" />
        <rect x="375" y="75" width="75" height="75" fill="#f0d9b5" />
        <rect x="450" y="75" width="75" height="75" fill="#b58863" />
        <rect x="525" y="75" width="75" height="75" fill="#f0d9b5" />

        <rect x="0" y="150" width="75" height="75" fill="#f0d9b5" />
        <rect x="75" y="150" width="75" height="75" fill="#b58863" />
        <rect x="150" y="150" width="75" height="75" fill="#f0d9b5" />
        <rect x="225" y="150" width="75" height="75" fill="#b58863" />
        <rect x="300" y="150" width="75" height="75" fill="#f0d9b5" />
        <rect x="375" y="150" width="75" height="75" fill="#b58863" />
        <rect x="450" y="150" width="75" height="75" fill="#f0d9b5" />
        <rect x="525" y="150" width="75" height="75" fill="#b58863" />

        <rect x="0" y="225" width="75" height="75" fill="#b58863" />
        <rect x="75" y="225" width="75" height="75" fill="#f0d9b5" />
        <rect x="150" y="225" width="75" height="75" fill="#b58863" />
        <rect x="225" y="225" width="75" height="75" fill="#f0d9b5" />
        <rect x="300" y="225" width="75" height="75" fill="#b58863" />
        <rect x="375" y="225" width="75" height="75" fill="#f0d9b5" />
        <rect x="450" y="225" width="75" height="75" fill="#b58863" />
        <rect x="525" y="225" width="75" height="75" fill="#f0d9b5" />

        <rect x="0" y="300" width="75" height="75" fill="#f0d9b5" />
        <rect x="75" y="300" width="75" height="75" fill="#b58863" />
        <rect x="150" y="300" width="75" height="75" fill="#f0d9b5" />
        <rect x="225" y="300" width="75" height="75" fill="#b58863" />
        <rect x="300" y="300" width="75" height="75" fill="#f0d9b5" />
        <rect x="375" y="300" width="75" height="75" fill="#b58863" />
        <rect x="450" y="300" width="75" height="75" fill="#f0d9b5" />
        <rect x="525" y="300" width="75" height="75" fill="#b58863" />

        <rect x="0" y="375" width="75" height="75" fill="#b58863" />
        <rect x="75" y="375" width="75" height="75" fill="#f0d9b5" />
        <rect x="150" y="375" width="75" height="75" fill="#b58863" />
        <rect x="225" y="375" width="75" height="75" fill="#f0d9b5" />
        <rect x="300" y="375" width="75" height="75" fill="#b58863" />
        <rect x="375" y="375" width="75" height="75" fill="#f0d9b5" />
        <rect x="450" y="375" width="75" height="75" fill="#b58863" />
        <rect x="525" y="375" width="75" height="75" fill="#f0d9b5" />

        <rect x="0" y="450" width="75" height="75" fill="#f0d9b5" />
        <rect x="75" y="450" width="75" height="75" fill="#b58863" />
        <rect x="150" y="450" width="75" height="75" fill="#f0d9b5" />
        <rect x="225" y="450" width="75" height="75" fill="#b58863" />
        <rect x="300" y="450" width="75" height="75" fill="#f0d9b5" />
        <rect x="375" y="450" width="75" height="75" fill="#b58863" />
        <rect x="450" y="450" width="75" height="75" fill="#f0d9b5" />
        <rect x="525" y="450" width="75" height="75" fill="#b58863" />

        <rect x="0" y="525" width="75" height="75" fill="#b58863" />
        <rect x="75" y="525" width="75" height="75" fill="#f0d9b5" />
        <rect x="150" y="525" width="75" height="75" fill="#b58863" />
        <rect x="225" y="525" width="75" height="75" fill="#f0d9b5" />
        <rect x="300" y="525" width="75" height="75" fill="#b58863" />
        <rect x="375" y="525" width="75" height="75" fill="#f0d9b5" />
        <rect x="450" y="525" width="75" height="75" fill="#b58863" />
        <rect x="525" y="525" width="75" height="75" fill="#f0d9b5" />

        {piece.map((item) => (
          <text
            key={item.id}
            x={(item.file - 1) * 75 + 37}
            y={(item.rank - 1) * 75 + 37}
          >
            {item.piece}{item.colorr}
          </text>
        ))}
      </svg>
    </>
  );
}

export default App;
