"use client"
import { useState, useMemo} from 'react';
import backgroundColor from './Counter.css';

// Box adalah komponen fungsional yang mewakili setiap kotak dalam daftar kotak. Ini menggunakan useMemo untuk memastikan komponen hanya diperbarui saat color berubah.
const Box = ({ id, color }) => {
  return useMemo(() => {
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: color,
          margin: '5px',
        }}
      >&#9733;</div>
    );
  }, [color]);
};

// Counter adalah komponen utama yang menampilkan daftar kotak dan penghitung. Ini menggunakan useState untuk melacak jumlah kotak dan nilai input
const Counter = () => {
  const [count, setCount] = useState(0);
  const [numberValue, setNumberValue] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // handleNumberChange digunakan untuk mengubah nilai input menjadi angka dan mengupdate number value dengan sesuai
  const handleNumberChange = (e) => {
    setNumberValue(Number(e.target.value));
  };

  // untuk membuat warna kotak menjadi acak saat kotak bertambah
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 8; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // generateBoxes adalah fungsi yang menghasilkan array objek kotak dengan jumlah yang sesuai dengan count. Setiap kotak memiliki ID unik dan warna acak.
  const generateBoxes = () => {
    const newBoxes = [];

    for (let i = 0; i < count; i++) {
      newBoxes.push({
        id: i,
        color: generateRandomColor(),
      });
    }

    return newBoxes;
  };

  useMemo(() => {

    // handleResize adalah fungsi yang dipanggil ketika lebar layar berubah. Ini memperbarui windowWidth sesuai dengan lebar layar saat ini dan menambahkan dan menghapus event listener untuk mendengarkan perubahan lebar layar.
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

// const untuk membuat perintah tambah pada button tambah  
  const incrementCount = () => {
    setCount(count + numberValue);
  };

// const untuk membuat perintah kurang pada button kurang
  const decrementCount = () => {
    setCount(count - numberValue);
  };

// const untuk membuat perintah reset untuk input number dan box kotak
  const resetCount = () => {
    setCount(0);
    setNumberValue('');
  };

// visibleBoxes menggunakan useMemo untuk memastikan daftar kotak hanya diperbarui saat count berubah.
  const visibleBoxes = useMemo(() => generateBoxes(), [count]);

// renderBoxes adalah fungsi yang menghasilkan elemen-elemen React yang mewakili kotak-kotak yang akan ditampilkan. Itu menggunakan windowWidth untuk menentukan jumlah maksimum kotak yang ditampilkan berdasarkan lebar layar saat ini.
  const renderBoxes = () => {
    const boxes = [];
    let row = [];

    for (let i = 0; i < count; i++) {
      const box = (
        <Box key={visibleBoxes[i].id} id={visibleBoxes[i].id} color={visibleBoxes[i].color} />
      );
      row.push(box);

      if ((windowWidth >= 800 && row.length === 12) || (windowWidth >= 550 && windowWidth < 880 && row.length === 4) || (windowWidth < 550 && row.length === 2)) {
        boxes.push(
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}
          >
            {row}
          </div>
        );
        row = [];
      }
    }

    if (row.length > 0) {
      boxes.push(
        <div
          key={count}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {row}
        </div>
      );
    }

    return boxes;
  };

  return (
    <div>
      <div
        className="background-container"
        style={{
          textAlign: 'center',
          overflowX: 'auto',
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {renderBoxes()}
      </div>

      <br />

      <div>
        <div
          className="background-container"
          style={{
            textAlign: 'center',
            maxHeight: '400px',
          }}
        >
          {/* digunakan untuk menampilkan jumlah yang di inputkan */}
          <h2>Counter: {count}</h2>

          {/* digunakan untuk menginputkan angka */}
          <input
            type="number"
            value={numberValue}
            onChange={handleNumberChange}
            style={{
              margin: 'auto',
              padding: '10px',
              width: '100%',
              boxSizing: 'border-box',
              color: 'black',
            }}
          />

          {/* button yang digunakan untuk menambahkan inputan dari user */}
          <button
            style={{
              backgroundColor: 'green',
              color: 'white',
              margin: '10px',
              padding: '10px 20px',
            }}
            onClick={incrementCount}
          >
            Tambah
          </button>

          {/* button yang digunakan untuk mengurangi inputan dari user */}
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              margin: '10px',
              padding: '10px 20px',
            }}
            onClick={decrementCount}
          >
            Kurang
          </button>

          {/* button yang digunakan untuk menghapus semua inputan dari user */}
          <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              margin: '10px',
              padding: '10px 20px',
            }}
            onClick={resetCount}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
