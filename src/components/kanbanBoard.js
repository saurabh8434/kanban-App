import Ticket from "./Ticket";
import { useState, useEffect } from "react";

const KanbanBoard = () => {

    const [ticketsStore, setTicketsStore] = useState([]);
    const [group, setGroup] = useState("status");
    const [sort, setSort] = useState("priority");

    async function fetchData(){

        try{
            const output = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await output.json();
            console.log(ticketsStore);
            console.log(data);
            setTicketsStore(data);
            console.log(ticketsStore);
        }
        catch(error){
            console.log("Unable to fetch data!");
            setTicketsStore([]);
        }

    }
  
    useEffect(() => {
        fetchData();

    }, []);
  
    const groupBy = (key) => {

      return ticketsStore.reduce((result, ticket) => {

        let value = ticket[key];

        if (!result[value]) {
          result[value] = [];
        }

        result[value].push(ticket);
        return result;
      }, {});
    };
  
    const sortBy = (key) => {

      const compare = (a, b) => {

        if (key === "priority") {
          return b[key] - a[key];
        }

        if (key === "title") {
          return a[key].localeCompare(b[key]);
        }

        return 0;
      };

      return [...ticketsStore].sort(compare);
    };
  
    const handleGroupChange = (event) => {

      let value = event.target.value;
      setGroup(value);

    };
  
    const handleSortChange = (event) => {

      let value = event.target.value;
      setSort(value);

    };
  
    const saveState = () => {

      let state = JSON.stringify({ group, sort });
      localStorage.setItem("kanban", state);

    };
  
    const loadState = () => {

      let state = localStorage.getItem("kanban");

      if (state) {
        state = JSON.parse(state);
        setGroup(state.group);
        setSort(state.sort);
      }
    };
  
    useEffect(() => {
      saveState();
    }, [group, sort]);
  
    useEffect(() => {
      loadState();
    }, []);
  
    return (
      <div className="kanban-board">
        <h1 className="kanban-title">Kanban Board</h1>
        <div className="kanban-options">
          <label className="kanban-label" htmlFor="group">
            Group by:
          </label>
          <select className="kanban-select" id="group" value={group} onChange={handleGroupChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
          <label className="kanban-label" htmlFor="sort">
            Sort by:
          </label>
          <select className="kanban-select" id="sort" value={sort} onChange={handleSortChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="kanban-columns">

          {Object.keys(groupBy(group)).map((key) => (

            <div className="kanban-column" key={key}>
              <h2 className="kanban-column-title">{key}</h2>
              <div className="kanban-column-list">

                {sortBy(sort)
                  .filter((ticket) => ticket[group] === key)
                  .map((ticket) => (

                    <Ticket ticket={ticket} key={ticket.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default KanbanBoard;