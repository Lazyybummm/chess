import { useEffect, useRef, useState } from "react";

let file_diff = null;
let rankdiff = null;
let flag = false;

function App() {
  const Roomidref=useRef();
  const Socketref=useRef();
  const [bool,setbool]=useState(false);
  const [colour,setcolour]=useState(null);
  const pid_ref=useRef()
  const [selectid, setselectid] = useState(null);
  const [active, setactive] = useState("input");
  const [piece, setpiece] = useState([
   
    { id: "wr1", piece: "r",  colorr: "w", file: 1, rank: 8 },
    { id: "wn1", piece: "kn", colorr: "w", file: 2, rank: 8 },
    { id: "wb1", piece: "b",  colorr: "w", file: 3, rank: 8 },
    { id: "wq",  piece: "q",  colorr: "w", file: 4, rank: 8 },
    { id: "wb2", piece: "b",  colorr: "w", file: 6, rank: 8 },
    { id: "wn2", piece: "kn", colorr: "w", file: 7, rank: 8 },
    { id: "wr2", piece: "r",  colorr: "w", file: 8, rank: 8 },
  
    { id: "wp1", piece: "p", colorr: "w", file: 1, rank: 7 },
    { id: "wp2", piece: "p", colorr: "w", file: 2, rank: 7 },
    { id: "wp3", piece: "p", colorr: "w", file: 3, rank: 7 },
    { id: "wp4", piece: "p", colorr: "w", file: 4, rank: 7 },
    { id: "wp5", piece: "p", colorr: "w", file: 5, rank: 7 },
    { id: "wp6", piece: "p", colorr: "w", file: 6, rank: 7 },
    { id: "wp7", piece: "p", colorr: "w", file: 7, rank: 7 },
    { id: "wp8", piece: "p", colorr: "w", file: 8, rank: 7 },
  
    
    { id: "br1", piece: "r",  colorr: "b", file: 1, rank: 1 },
    { id: "bn1", piece: "kn", colorr: "b", file: 2, rank: 1 },
    { id: "bb1", piece: "b",  colorr: "b", file: 3, rank: 1 },
    { id: "bq",  piece: "q",  colorr: "b", file: 4, rank: 1 },
    { id: "bb2", piece: "b",  colorr: "b", file: 6, rank: 1 },
    { id: "bn2", piece: "kn", colorr: "b", file: 7, rank: 1 },
    { id: "br2", piece: "r",  colorr: "b", file: 8, rank: 1 },
  
    { id: "bp1", piece: "p", colorr: "b", file: 1, rank: 2 },
    { id: "bp2", piece: "p", colorr: "b", file: 2, rank: 2 },
    { id: "bp3", piece: "p", colorr: "b", file: 3, rank: 2 },
    { id: "bp4", piece: "p", colorr: "b", file: 4, rank: 2 },
    { id: "bp5", piece: "p", colorr: "b", file: 5, rank: 2 },
    { id: "bp6", piece: "p", colorr: "b", file: 6, rank: 2 },
    { id: "bp7", piece: "p", colorr: "b", file: 7, rank: 2 },
    { id: "bp8", piece: "p", colorr: "b", file: 8, rank: 2 }
  ]);
  
  


  useEffect(() => {
    if (!bool) return;
  
    const ws = new WebSocket("ws://localhost:8080");
    Socketref.current = ws;
  
    ws.onopen = () => {
      if (!Roomidref.current) {
        console.log("Room id not ready yet");
        return;
      }
      console.log(Roomidref.current)
      ws.send(JSON.stringify({
        type: "login",
        roomId: Roomidref.current,
      }));
    };

    Socketref.current.onmessage=(event)=>{
      const parsed=JSON.parse(event.data);
      if(parsed.type=='set-color'){
        setcolour(parsed.colour);
      }
      if(parsed.type=="move-made"){
        let file=parsed.file
        let rank=parsed.rank
        let piece_id=parsed.piece_id
        if(colour=='black'){
          file=9-file
          rank=9-rank
        }
        
        
        setpiece(prev => {
          
          const newPieces = prev.filter(p => !(p.file === file && p.rank === rank));
          return newPieces.map(p =>
            p.id === piece_id
              ? { ...p, file: file, rank: rank }
              : p
          );
        });





        
      }
    }
  
  }, [bool]);
  




  function checker(file, rank) {
    const check = piece.filter((p) => p.file == file && p.rank == rank);
    if (check.length !== 0) return check;
    return null;
  }



  function handleclick(event) {
    let file_clicked = Math.ceil(event.clientX / 75);
    let rank_clicked = Math.ceil(event.clientY / 75);
    
    // Transform coordinates for black player (since board is rotated)
    if (colour === "black") {
      file_clicked = 9 - file_clicked;
      rank_clicked = 9 - rank_clicked;
    }
    
    console.log(file_clicked, rank_clicked);

    if (active === "active") {
      file_diff = null;
      rankdiff = null;

      if (selectid.piece === "p") {
        // Adjust pawn direction based on color
        const direction = selectid.colorr === "w" ? -1 : 1;
        const startRank = selectid.colorr === "w" ? 7 : 2;
        
        if ((selectid.colorr === "w" && rank_clicked > selectid.rank) || 
            (selectid.colorr === "b" && rank_clicked < selectid.rank)) {
          // Moving backwards
        } else if (file_clicked === selectid.file) {
          // Moving forward
          if (rank_clicked === selectid.rank + direction * 2 && selectid.rank === startRank) {
            if (checker(file_clicked, rank_clicked) == null) {
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }

          if (rank_clicked === selectid.rank + direction) {
            if (checker(file_clicked, rank_clicked) == null) {
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }
        } else {
          // Diagonal captures
          if (
            file_clicked === selectid.file + 1 &&
            rank_clicked === selectid.rank + direction
          ) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission && permission[0].colorr !== selectid.colorr) {
              setpiece((prev) =>
                prev.filter((p) => p.id !== permission[0].id)
              );
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }

          if (
            file_clicked === selectid.file - 1 &&
            rank_clicked === selectid.rank + direction
          ) {
            const permission = checker(file_clicked, rank_clicked);
            if (permission && permission[0].colorr !== selectid.colorr) {
              setpiece((prev) =>
                prev.filter((p) => p.id !== permission[0].id)
              );
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
          }
        }
      }

      if (selectid.piece === "kn") {
        const df = file_clicked - selectid.file;
        const dr = rank_clicked - selectid.rank;

        if (
          (Math.abs(df) === 2 && Math.abs(dr) === 1) ||
          (Math.abs(df) === 1 && Math.abs(dr) === 2)
        ) {
          const permission = checker(file_clicked, rank_clicked);
          if (!permission) {
            file_diff = file_clicked;
            rankdiff = rank_clicked;
          } else if (permission[0].colorr !== selectid.colorr) {
           
            setpiece((prev) =>
              prev.filter((p) => p.id !== permission[0].id)
            );
            file_diff = file_clicked;
            rankdiff = rank_clicked;
          }
          
        }
      }

      if (selectid.piece === "b") {
        flag = true;
        const df = file_clicked - selectid.file;
        const dr = rank_clicked - selectid.rank;

        if (Math.abs(df) === Math.abs(dr)) {
          const sf = df > 0 ? 1 : -1;
          const sr = dr > 0 ? 1 : -1;

          let i = selectid.file + sf;
          let j = selectid.rank + sr;

          while (i !== file_clicked && j !== rank_clicked) {
            if (checker(i, j)) {
              flag = false;
              break;
            }
            i += sf;
            j += sr;
          }

          if (flag) {
            const permission = checker(file_clicked, rank_clicked);
            if (!permission) {
              
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            } else if (permission[0].colorr !== selectid.colorr) {
              
              setpiece((prev) =>
                prev.filter((p) => p.id !== permission[0].id)
              );
              file_diff = file_clicked;
              rankdiff = rank_clicked;
            }
            
          }
        }
      }

      if (selectid.piece === "r") {
        flag = true;

        if (selectid.file === file_clicked) {
          const step = rank_clicked > selectid.rank ? 1 : -1;
          for (
            let i = selectid.rank + step;
            i !== rank_clicked;
            i += step
          ) {
            if (checker(file_clicked, i)) {
              flag = false;
              break;
            }
          }
        } else if (selectid.rank === rank_clicked) {
          const step = file_clicked > selectid.file ? 1 : -1;
          for (
            let i = selectid.file + step;
            i !== file_clicked;
            i += step
          ) {
            if (checker(i, rank_clicked)) {
              flag = false;
              break;
            }
          }
        } else {
          flag = false;
        }

        if (flag) {
          const permission = checker(file_clicked, rank_clicked);
          if (!permission) {
            
            file_diff = file_clicked;
            rankdiff = rank_clicked;
          } else if (permission[0].colorr !== selectid.colorr) {
           
            setpiece((prev) =>
              prev.filter((p) => p.id !== permission[0].id)
            );
            file_diff = file_clicked;
            rankdiff = rank_clicked;
          }
          
        }
      }

      if (selectid.piece === "q") {
        flag = true;

        const df = file_clicked - selectid.file;
        const dr = rank_clicked - selectid.rank;

        let sf = df === 0 ? 0 : df > 0 ? 1 : -1;
        let sr = dr === 0 ? 0 : dr > 0 ? 1 : -1;

        if (
          df === 0 ||
          dr === 0 ||
          Math.abs(df) === Math.abs(dr)
        ) {
          let i = selectid.file + sf;
          let j = selectid.rank + sr;

          while (i !== file_clicked || j !== rank_clicked) {
            if (checker(i, j)) {
              flag = false;
              break;
            }
            i += sf;
            j += sr;
          }
        } else {
          flag = false;
        }
        
        if (flag) {
          const permission = checker(file_clicked, rank_clicked);
          if(permission==null){
            file_diff = file_clicked;
            rankdiff = rank_clicked;
          }
          if (permission && permission[0].colorr !== selectid.colorr) {
            setpiece((prev) =>
              prev.filter((p) => p.id !== permission[0].id)
            );
            file_diff = file_clicked;
            rankdiff = rank_clicked;
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
        
        console.log(selectid.id);
        Socketref.current.send(JSON.stringify({
          type: "move-made",
          file: file_diff,
          rank: rankdiff,
          piece_id: selectid.id,
          colour: colour,
          roomId: Roomidref.current
        }));
      }

      setactive("");
      setselectid(null);
    } else {
      const found = piece.find(
        (p) => p.file === file_clicked && p.rank === rank_clicked
      );
      if (found) {
        setselectid(found);
        console.log(found.id);
        setactive("active");
      }
    }
  }

  if (active !== "input") {
    return (
      <svg
  width="600"
  height="600"
  viewBox="0 0 600 600"
  style={{
    transform: colour === "black" ? "rotate(180deg)" : "none"
  }}
  onClick={handleclick}
>

        {[...Array(64)].map((_, i) => {
          const x = (i % 8) * 75;
          const y = Math.floor(i / 8) * 75;
          const c =
            (i + Math.floor(i / 8)) % 2 === 0 ? "#f0d9b5" : "#b58863";
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width="75"
              height="75"
              fill={c}
            />
          );
        })}
  
  {piece.map((p) => {
  const cx = (p.file - 1) * 75 + 37;
  const cy = (p.rank - 1) * 75 + 37;

  
  const pieceSymbols = {
    w: {
      k: '♔',
      q: '♕',
      r: '♖',
      b: '♗',
      kn: '♘',
      p: '♙'
    },
    b: {
      k: '♚',
      q: '♛',
      r: '♜',
      b: '♝',
      kn: '♞',
      p: '♟'
    }
  };

  const symbol = pieceSymbols[p.colorr][p.piece];

  return (
    <text
      key={p.id}
      x={cx}
      y={cy}
      fontSize="48"
      textAnchor="middle"
      dominantBaseline="middle"
      transform={
        colour === "black"
          ? `rotate(180 ${cx} ${cy})`
          : undefined
      }
    >
      {symbol}
    </text>
  );
})}

      </svg>
    );
  }
  
  return <Input Roomidref={Roomidref}  setactive={setactive} setbool={setbool} />;
  
}

function Input({Roomidref,setactive,setbool}){
  const inp1ref=useRef();
  const inp2ref=useRef();
  return <>
  <div><input ref={inp1ref} placeholder="enter room id"></input></div>
  <button onClick={()=>{
    Roomidref.current=inp1ref.current.value
    setactive(null)
    setbool(p=>!p)
    }}>play</button>
  </>
}

export default App;