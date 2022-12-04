import { ChangeEvent, useState } from "react";

import {
  useMediaQuery,
  useWindowSize,
  useDebounce,
  OutsideAlerter,
} from "./hooks";

const App = () => {
  const [localSearchValue, setLocalSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isContentVisible, setContentVisible] = useState(true);

  // useWindowSize() usage
  const width = useWindowSize();
  // useMediaQuery() usage
  const isMobile = useMediaQuery("(max-width: 500px)");

  const InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);
  };

  // useWindowSize() usage
  useDebounce(() => {
    setSearchValue(localSearchValue);
  }, [localSearchValue]);

  return (
    <div className="App">
      {/* useMediaQuery() & useWindowSize() result */}
      {!isMobile && <h3>useWindowSize(): {width}px</h3>}
      <div className="row">
        <h3>Without UseDebounce()</h3>
        <input
          type="search"
          onChange={(e) => setLocalSearchValue(e.target.value)}
        />
        <h3>localSearchValue: {localSearchValue}</h3>
      </div>
      {/* UseDebounce() result */}
      <div className="row">
        <h3>With UseDebounce()</h3>
        <input type="search" onChange={InputChangeHandler} />
        <h3>searchValue: {searchValue}</h3>
      </div>
      <div className="row">
        <h3>Without useOutsideAlerter()</h3>
        <p className="note">
          Try to click on the Search Form button and enter some data
        </p>
        <button onClick={() => setContentVisible((prevState) => !prevState)}>
          Search Form ({isContentVisible ? "close" : "open"})
        </button>
        {isContentVisible && (
          <div onClick={() => setContentVisible(false)}>
            <input type="search" onChange={InputChangeHandler} />
          </div>
        )}
      </div>
      {/* useOutsideAlerter() result */}
      <div className="row">
        <h3>With useOutsideAlerter()</h3>
        <button onClick={() => setContentVisible((prevState) => !prevState)}>
          Search Form ({isContentVisible ? "close" : "open"})
        </button>
        {isContentVisible && (
          <OutsideAlerter
            onBlur={() => setTimeout(() => setContentVisible(false), 100)}
          >
            <input type="search" onChange={InputChangeHandler} />
          </OutsideAlerter>
        )}
      </div>
    </div>
  );
};

export default App;
