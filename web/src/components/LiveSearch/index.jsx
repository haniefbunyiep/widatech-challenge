import { useCallback, useEffect, useRef, useState } from 'react';

const LiveSearch = ({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState(value);

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextIndexCount = focusedIndex;

    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % results.length;
    }

    if (key === 'ArrowUp') {
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === 'Escape') {
      resetSearchComplete();
    }

    if (key === 'Enter') {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (resultContainer.current) {
      resultContainer.current.scrollIntoView({ block: 'center' });
    }
  }, [focusedIndex]);

  useEffect(() => {
    setShowResults(results.length > 0);
  }, [results]);

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        className='relative'
      >
        <input
          value={defaultValue}
          onChange={handleChange}
          type='text'
          className='w-[600px] rounded-full border-2 border-gray-500 px-5 py-3 text-lg outline-none transition focus:border-gray-700'
          placeholder='Search your query...'
        />

        {showResults && (
          <div className='absolute mt-1 max-h-56 w-full overflow-y-auto rounded-bl rounded-br bg-white p-2 shadow-lg'>
            {results.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => handleSelection(index)}
                ref={index === focusedIndex ? resultContainer : null}
                style={{
                  backgroundColor:
                    index === focusedIndex ? 'rgba(0,0,0,0.1)' : '',
                }}
                className='cursor-pointer p-2 hover:bg-black hover:bg-opacity-10'
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSearch;
