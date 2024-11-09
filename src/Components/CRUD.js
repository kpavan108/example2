import { useState } from "react"; // Importing useState hook from React to manage state in the component

function Crud() {
    // State to hold form input values
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', location: '',age:'' });
    
    // State to hold the list of items
    const [items, setItems] = useState([]);
    
    // State to track whether we are editing an existing item
    const [isEditing, setEditing] = useState(false);
    
    // State to store the ID of the item being edited
    const [editItemId, setEditItemId] = useState(null);

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the input event
        setFormData({ ...formData, [name]: value }); // Update the formData state with the new value
    };

    // Function to handle form submission
    const handleSubmission = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (isEditing) { // Check if we are editing an item
            // Update the existing item in the items array
            setItems(items.map(item => (item.id === editItemId ? { ...item, ...formData } : item)));
            setEditing(false); // Set editing state to false
            setEditItemId(null); // Reset the editItemId
        } else {
            // Add a new item to the items array with a unique ID
            setItems([...items, { ...formData, id: Date.now() }]);
        }

        // Reset the form fields
        setFormData({ fullName: '', email: '', phone: '', location: '',age:'' });
    };

    // Function to prepare an item for editing
    const editItem = (item) => {
        // Populate form fields with the selected item's data
        setFormData({ fullName: item.fullName, email: item.email, phone: item.phone, location: item.location });
        setEditing(true); // Set editing state to true
        setEditItemId(item.id); // Store the ID of the item being edited
    };

    // Function to delete an item by its ID
    const deleteItem = (id) => {
        // Filter out the item with the given ID from the items array
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div>
            <h1>CRUD Operations</h1>
            <form onSubmit={handleSubmission}> {/* Form to add or edit items */}
                <input
                    type="text"
                    name="fullName" // Name attribute matches formData keys
                    placeholder="Full Name"
                    value={formData.fullName} // Controlled input
                    onChange={handleChange} // Update state on change
                    required // Makes this field mandatory
                />
                <br />
                <input
                    type="email"
                    name="email" // Name attribute matches formData keys
                    placeholder="Email"
                    value={formData.email} // Controlled input
                    onChange={handleChange} // Update state on change
                    required // Makes this field mandatory
                />
                <br />
                <input
                    type="tel"
                    name="phone" // Name attribute matches formData keys
                    placeholder="Phone"
                    value={formData.phone} // Controlled input
                    onChange={handleChange} // Update state on change
                    required // Makes this field mandatory
                />
                <br />
                <input
                    type="text"
                    name="location" // Name attribute matches formData keys
                    placeholder="Location"
                    value={formData.location} // Controlled input
                    onChange={handleChange} // Update state on change
                    required // Makes this field mandatory
                />
                <br />
                <input
                    type="number"
                    name="age" // Name attribute matches formData keys
                    placeholder="age"
                    value={formData.age} // Controlled input
                    onChange={handleChange} // Update state on change
                    required // Makes this field mandatory
                />
                <br />

                <button type="submit">
                    {isEditing ? 'Update' : 'Add'} {/* Button text changes based on editing state */}
                </button>
            </form>

            <div>
                <h2>Items</h2>
                <table border="1" cellPadding="8" cellSpacing="0"> {/* Table to display items */}
                    <thead>
                        <tr>
                            <th>Full Name</th> {/* Table header for full name */}
                            <th>Email</th> {/* Table header for email */}
                            <th>Phone</th> {/* Table header for phone */}
                            <th>Location</th> {/* Table header for location */}
                            <th>age</th>
                            <th>Actions</th> {/* Table header for action buttons */}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => ( // Map over items to create table rows
                            <tr key={item.id}> {/* Use item's ID as the unique key */}
                                <td>{item.fullName}</td> {/* Display full name */}
                                <td>{item.email}</td> {/* Display email */}
                                <td>{item.phone}</td> {/* Display phone */}
                                <td>{item.location}</td> {/* Display location */}
                                <td>{item.age}</td>
                                <td>
                                    <button onClick={() => editItem(item)}>Edit</button> {/* Edit button */}
                                    <button onClick={() => deleteItem(item.id)}>Delete</button> {/* Delete button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Crud; // Export the Crud component for use in other parts of the application