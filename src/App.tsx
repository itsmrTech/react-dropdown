import React from "react";
import logo from "./doggo.png";
import "./App.scss";
import Dropdown from "./components/dropdown";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is a demo of a floating dropdown component. The dropdown is</p>

        <div className="section">
          <h1>Floating</h1>
          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div className="section">
          <h1>Not Floating</h1>

          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
          />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div className="section">
          <h1>Long Text Items</h1>

          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓Education 🎓Education 🎓Education 🎓Education 🎓Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮Yeeeah, Science! 🔮Yeeeah, Science! 🔮Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
          />
        </div>
        <div className="section">
          <h1>Direction Right to Left</h1>

          <Dropdown
            direction={"rtl"}
            allowCreateNewItem={true}
            listItems={[
              { text: "آموزش 🎓", selected: false },
              {
                text: "بله، علم! 🔮 بله، علم! 🔮 بله، علم! 🔮 بله، علم! 🔮",
                selected: true,
              },
              { text: "هنر 🎭", selected: false },
              { text: "ورزش ⚽", selected: false },
              { text: "بازی ها 🎮", selected: false },
              { text: "سلامت 🏥", selected: false },
            ]}
            floating={false}
          />
        </div>
        <div className="section">
          <h1>Small Size</h1>

          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
            size={"small"}
          />
        </div>
        <div className="section">
          <h1>Large Size</h1>

          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
            size={"large"}
          />
        </div>
        <div className="section">
          <h1>Create New Item Prohibited</h1>

          <Dropdown
            allowCreateNewItem={false}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: true,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
          />
        </div>
        <div className="section">
          <h1>Empty List</h1>

          <Dropdown allowCreateNewItem={true} listItems={[]} floating={false} />
        </div>
        <div className="section">
          <h1>On Selected Items Changed</h1>
          <p>
            This listener will return all selected items when an item is
            deslected / selected / created
          </p>
          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: false,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
            onSelectedItemsChanged={(items) => {
              alert(`Selected items: ${items.join(", ")}`);
            }}
          />
        </div>
        <div className="section">
          <h1>On New Item Created</h1>

          <Dropdown
            allowCreateNewItem={true}
            listItems={[
              { text: "Education 🎓", selected: false },
              {
                text: "Yeeeah, Science! 🔮",
                selected: false,
              },
              { text: "Art 🎭", selected: false },
              { text: "Sport ⚽", selected: false },
              { text: "Games 🎮", selected: false },
              { text: "Health 🏥", selected: false },
            ]}
            floating={false}
            onNewItemCreated={(item) => {
              alert(`New items: ${item}`);
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
