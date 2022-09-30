import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
/*
    This component opens up in a modal and searches and navigates to the selected item.  

    Items is an array of objects with the following properties:
    - name: string || React component
    - icon: React component
    - pathname: string 
    - onClick: function -- optional
    - search: string that will be searched for in the global search

*/

  
export default function GlobalSearch({
    items=[],
}) {
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);    // For modal
    const [search, setSearch] = useState('');               // For input box

    // This is for navigating through the up daown keys
    // We just set the index and use css to highlight the item
    // and also on click or enter pressed we sent the `item` to handleClick function  
    const [highlightedItem, setHighlightedItem] = useState(0);

    // On search change we set the highlighted item to 0
    const onSearchChange = (e) => {
        setSearch(e.target.value);
        setHighlightedItem(0);
    }

    const handleCancel = () => {
        setSearchOpen(false);
        // setSearch('');
    }

    // On click we either run the function or we navigate to the page
    const handleClick = (item) => {
        if (!item) return;

        if (item.onClick) {
            item.onClick();
        } else {
            navigate(item.pathname);
        }
        setSearchOpen(false);
    }

    // This is for the up donw keys highlight item 
    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const enterPressed = useKeyPress('Enter');
    useEffect(() => {
        if(searchOpen){
            // console.log("Hii")
            if (arrowUpPressed) {
                setHighlightedItem(prev => (highlightedItem - 1 + filteredItems.length) % filteredItems.length);
            }
            if (arrowDownPressed) {
                setHighlightedItem(prev => (prev + 1) % filteredItems.length);
            }    
            // If enter is pressed the handleClick will take care of navigation / function
            if (enterPressed) {
                handleClick(filteredItems[highlightedItem]);
            }
        }
    }, [arrowUpPressed, arrowDownPressed, enterPressed]);
  
    // This is the search shortcut key .... Change the if to change the keys
    const handleSearchShortcut = (e) => {
        if (e.key === "k" && e.ctrlKey) {
            e.preventDefault();
            setSearchOpen(true);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keydown', (e) => {
            handleSearchShortcut(e);
        });
        return () => document.removeEventListener('keydown', handleSearchShortcut);
    }, [searchOpen, highlightedItem])

    // Whenever the search window closes we reset the search and item
    useEffect(() => {
        if (!searchOpen) {
            setHighlightedItem(0);
            setSearch('');
        }
    }, [searchOpen, search])


    // main options array
    // const [filteredItems, setFilteredItems] = useState(items);
    const filteredItems = items.filter(item => {
        if (item.search) {
            return item.search.toLowerCase().includes(search.toLowerCase());
        }
        return false;
    })
 
    return (
        <div className="global-search">
            <Modal
                title="Global Search"
                open={searchOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
            >
                <Input
                    placeholder="Search"
                    key={searchOpen}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear={true}
                    // this should always be infocus
                    autoFocus={true}
                />
                <div style={{ marginTop: 10, maxHeight: 400, overflowY: 'auto' }}>
                    {/* Div should automatically scroll to highlighted item */}
                    {
                        filteredItems.map((item, index) => (
                            <div
                                // The highlighted item is just for visulization and handled in CSS.
                                style={{
                                    padding: 10,
                                    backgroundColor: index === highlightedItem ? 'var(--navbarBackground)' : 'white',
                                    color: index === highlightedItem ? 'var(--navbarColor)' : 'black',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    fontSize: '20px'
                                }}

                                // Check logic and comments above
                                onClick={() => handleClick(item) }

                                // if this is the highlighted item, scroll to it
                                ref={index === highlightedItem ? (el) => {
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                                    }
                                } : null}

                                // Mouse enter should highlight the item
                                // But it should not be affected by the automatic scrolling
                                onMouseEnter={() => {
                                    setHighlightedItem(index);
                                }}
                                key={item.key || item.name}
                            >
                                <span>
                                    {item.icon}
                                </span>
                                <span style={{ marginLeft: 10 }} >
                                    {item.name}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </Modal>
            <div style={{ color: '#9e9e9e', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} onClick={() => setSearchOpen(true)}>
                <FaSearch />
                <span style={{ marginLeft: 5 }}>Ctrl + K</span>
            </div>
        </div>
    )
}


export const useKeyPress = targetKey => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const upHandler = ({ key }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [targetKey]);

    return keyPressed;
};
