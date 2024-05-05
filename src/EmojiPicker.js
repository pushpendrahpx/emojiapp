import SearchIcon from "./SearchIcon.svg";
import "./App.css";
import baseImg from "./assets/merged-min-64.png";
import PositionData from "./assets/json/posdata.json";
import groupData from "./assets/json/groups.json";

import React, { useEffect, useState, useRef, useMemo } from "react";

function EmojiItem({ item, onClick = () => {}, baseImg }) {
  const handleEmojiClick = () => {
    onClick(item);
  };
  return (
    <div
      style={{ display: "flex" }}
      className="emoji-item-c"
      onClick={handleEmojiClick}
    >
      <div
        className="emoji-item"
        style={{
          background: "url(" + baseImg + ")",
          backgroundPosition: `-${
            (24 * PositionData[`${item[0].split("_").join("-")}.png`]?.x) / 64
          }px -${
            (24 * PositionData[`${item[0].split("_").join("-")}.png`]?.y) / 64
          }px`,
          backgroundSize: "6100% 6100%",
        }}
      ></div>
    </div>
  );
}
function EmojiPicker({ onEmojiClick = () => {}, baseImg }) {
  const emojilistRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState("Smileys & Emotion");

  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  let groupIcons = useMemo(() => {
    return {
      // Recent: {
      //   background:
      //     'url('+baseImg+') -432px -720px / 6100% 6100%',
      // },
      "Smileys & Emotion": {
        background: "url(" + baseImg + ") -384px -768px / 6100% 6100%",
      },
      "People & Body": {
        background: "url(" + baseImg + ") -1320px -288px / 6100% 6100%",
      },
      Component: {
        background: "url(" + baseImg + ") -1272px -240px / 6100% 6100%",
      },
      "Animals & Nature": {
        background: "url(" + baseImg + ") -1416px -264px / 6100% 6100%",
      },
      "Food & Drink": {
        background: "url(" + baseImg + ") -768px -144px / 6100% 6100%",
      },
      "Travel & Places": {
        background: "url(" + baseImg + ") -576px -120px / 6100% 6100%",
      },
      Activities: {
        background: "url(" + baseImg + ") -432px -168px / 6100% 6100%",
      },
      Objects: {
        background: "url(" + baseImg + ") -648px -312px / 6100% 6100%",
      },
      Symbols: {
        background: "url(" + baseImg + ") -720px -240px / 6100% 6100%",
      },
      Flags: {
        background: "url(" + baseImg + ") -600px -864px / 6100% 6100%",
      },
    };
  }, []);
  useEffect(() => {
    if (!baseImg) {
      throw "Please provide correct Base Image; Check documentation";
    }
  }, []);
  const handleCategorySelect = (eachGroup) => {
    setCurrentCategory(eachGroup);
    let element = document.getElementById(
      `emoji-container-${eachGroup.split(" ").join("_")}`
    );
    let offset = element.offsetTop;
    if (emojilistRef.current) emojilistRef.current.scrollTop = offset - 110;
  };
  useEffect(() => {
    if (searchString) {
      let results = [];
      groupData.groups.forEach((eachGroup) => {
        eachGroup.subgroups.forEach((eachSubgroup) => {
          eachSubgroup.emojis.forEach((eachEmoji) => {
            if (eachEmoji[1].includes(searchString)) {
              results.push(eachEmoji);
            }
          });
        });
      });
      setSearchResults(results);
    }
  }, [searchString]);
  return (
    <div>
      <div className="emoji-picker-container">
        <div className="emoji-picker-search-c">
          <div>
            <img src={SearchIcon} height={20} width={20} />
          </div>
          <input
            placeholder="Search Emojis"
            onChange={(e) =>
              setSearchString(e.target.value.toLowerCase().trim())
            }
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="emoji-categories"
        >
          {Object.keys(groupIcons).map((eachGroup) => {
            // if (eachGroup === "Component") return;
            return (
              <div
                key={eachGroup}
                className="emoji-item-c"
                style={{
                  borderBottom: `2px solid ${
                    currentCategory === eachGroup && searchString.length === 0
                      ? "black"
                      : "transparent"
                  }`,
                  borderRadius: 0,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,

                  filter:
                    searchString.length > 0 || currentCategory !== eachGroup
                      ? "grayscale(100%)"
                      : "none",
                }}
                onClick={
                  searchString.length === 0
                    ? () => handleCategorySelect(eachGroup)
                    : null
                }
              >
                <div
                  key={`group-${eachGroup}`}
                  className="emoji-item"
                  style={{
                    cursor: "pointer",

                    ...groupIcons[eachGroup],
                  }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="emojis-list-container" ref={emojilistRef}>
          {searchString.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {searchResults.map((eachEmoji) => {
                return (
                  <EmojiItem
                    key={eachEmoji[0]}
                    item={eachEmoji}
                    onClick={onEmojiClick}
                    baseImg={baseImg}
                  />
                );
              })}
            </div>
          )}
          {searchString.length === 0 &&
            groupData.groups.map((eachGroup) => {
              // if (eachGroup === "Component") return;
              return (
                <div
                  key={`container-group-${eachGroup.group}`}
                  id={`emoji-container-${eachGroup.group.split(" ").join("_")}`}
                >
                  <div className="emoji-group-title">{eachGroup.group}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {eachGroup.subgroups.map((eachSubGroup) => {
                      return (
                        <React.Fragment
                          key={eachGroup.group + "-" + eachSubGroup.subgroup}
                        >
                          {eachSubGroup.emojis.map((eachEmoji, i) => {
                            return (
                              <EmojiItem
                                key={eachEmoji[0]}
                                item={eachEmoji}
                                onClick={onEmojiClick}
                                baseImg={baseImg}
                              />
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default EmojiPicker;
