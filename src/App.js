import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [word, setWord] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isPending, startTransition] = useTransition();

  console.log(searchList);

  const handleChange = (e) => {
    const searchWord = e.target.value;

    setWord(e.target.value);

    startTransition(() => {
      const newFilter = list.filter((li) => {
        return li.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setSearchList([]);
      } else {
        setSearchList(newFilter);
      }
    });
  };

  const FetchData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="App" style={{ padding: "10px" }}>
      <input
        type="text"
        placeholder="Enter here ..."
        value={word}
        onChange={(e) => handleChange(e)}
      />
      {isPending ? (
        <p>loading</p>
      ) : !searchList.length ? (
        <p>No Data Found</p>
      ) : (
        searchList.map((li) => <p key={li.id}>{li.title}</p>)
      )}
    </div>
  );
}

export default App;
