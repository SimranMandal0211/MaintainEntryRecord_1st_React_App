let customers = [];
const capacity = 25;
let seatsLeft = 25;

// Create form submit handler here
let gCountInput = React.createRef();
let gNameInput = React.createRef();
      let gPhoneInput = React.createRef();

    //   console.log(guestInfo.gCount, "  ", guestInfo.gName, "  ", guestInfo.gPhone);


    // clear input field
    const clearInputs = () => {
        gCountInput.current.value = "";
        gNameInput.current.value = "";
        gPhoneInput.current.value = "";
    };

    // when click on checkout btn
    function CheckOut(index) {
        const updatedCustomers = [...customers];
        updatedCustomers[index].guestInfo.gCheckOut = new Date().toLocaleTimeString();
        updatedCustomers[index].guestInfo.gStatus = 'Served';

        if(seatsLeft > capacity){
            alert('Capacity Exceeding');
            return;
        }
        seatsLeft +=  parseInt(updatedCustomers[index].guestInfo.gCount);
        customers = updatedCustomers;

        console.log('Updated customers after checkout:', updatedCustomers);

        rootElement.render(<App />);
    }

    // Delete entry
    function DeleteEntry(index){
        const updatedCustomers = [...customers];
        if(updatedCustomers[index].guestInfo.gCheckOut === '-'){
            seatsLeft += parseInt(updatedCustomers[index].guestInfo.gCount);
        }
        updatedCustomers.splice(index, 1);
        customers = updatedCustomers;

        console.log('After deleting customer: ',updatedCustomers);

        rootElement.render(<App />);
    }

    // handle form
      function formHandler(e){
        e.preventDefault();
        const guestInfo = {
            gCount : gCountInput.current.value,
            gName : gNameInput.current.value,
            gPhone : gPhoneInput.current.value,
            gCheckIn: new Date().toLocaleTimeString(),
            gCheckOut : '-',
            gStatus : 'Click to Check Out',
        }

        clearInputs();
        // console.log("function::: ", guestInfo.gCount, "  ", guestInfo.gName, "  ", guestInfo.gPhone);
        if(guestInfo.gCount > capacity || seatsLeft < guestInfo.gCount){
            alert('Guest count exceeds capacity');
            return; //stop further execution
        }

        // Check if customer with the same name already exists
        const isExistingCustomer = customers.some(
            customer => customer.guestInfo.gName === guestInfo.gName
        );

        if (isExistingCustomer) {
            alert('Customer with the same name already exists');
            return; // Stop further execution
        }

        seatsLeft -= guestInfo.gCount;
        customers.unshift({guestInfo});
        
        console.log('new entry customers::', customers);

        rootElement.render(<App />);

      }

    // Input form
      const Form = () => (
        <form onSubmit = {formHandler}>
            <input type="number" ref={gCountInput} placeholder="Guests Count" />
            <input type="text" ref={gNameInput} placeholder="Primary Guest Name" />
            <input type="number" ref={gPhoneInput} placeholder="Phone Number" />  
            <button type="submit">Add Entry</button>  
        </form>
      );

    //   Result Table show
      const ResultTable = () => (
        <>
            <thead>
                <tr>
                    <th>Count</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Check In</th>  
                    <th>Check Out</th>  
                    <th>Status</th>
                    <th>Remove Entry</th>
                </tr>
            </thead>    
            <tbody>  
                {customers.map((customer, index) => (
                <tr key={index}>
                    <td>{customer.guestInfo.gCount}</td>
                    <td>{customer.guestInfo.gName}</td> 
                    <td>{customer.guestInfo.gPhone}</td>
                    <td>{customer.guestInfo.gCheckIn}</td> 
                    <td>{customer.guestInfo.gCheckOut}</td>
                    <td onClick = {() => CheckOut(index)} >{customer.guestInfo.gStatus}</td>
                    <td onClick = {() => DeleteEntry(index)}>Delete</td>   
                </tr>
                ))}
            </tbody>
        </>
      )

    
      const App = () => (
        <div className="App" style={{ textAlign: "center" }}>
          <div>
            <h2>Total Capacity: {capacity}</h2>
            <h2>Seats Left: {seatsLeft}</h2>
          </div>

          {/* Create a form here */}
          <Form />
        
          {/* Complete table to show records of customers */}
          <table border="1px" style={{ margin: "auto" }}>
            <ResultTable />  
          </table>
        </div>
      );

      const rootElement = ReactDOM.createRoot(document.getElementById("root"));
      rootElement.render(<App />);