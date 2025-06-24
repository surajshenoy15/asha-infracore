function GetQuote() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Get a Price Quote</h2>
      <form className="flex flex-col space-y-4">
        <input placeholder="First Name" className="border p-2" />
        <input placeholder="Last Name" className="border p-2" />
        <input placeholder="Email" className="border p-2" />
        <input placeholder="Phone Number" className="border p-2" />
        <textarea placeholder="Comments" className="border p-2" />
        <button type="submit" className="bg-orange-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default GetQuote;
