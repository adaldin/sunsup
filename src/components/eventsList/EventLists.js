// React

function EventsList() {
  //******STATES*/
  const [events, setEvents] = useState([]);

  //******USE EFFECT*/
  useEffect(() => {
    getData();
  }, []);

  //******LOGIC*/
  async function getData() {
    const q = query(collection(db, "eventos"));
    const querySnapshot = await getDocs(q);
    console.log("db", querySnapshot);
    querySnapshot.forEach((doc) => {
      let datosMolones = doc.data();
      console.log("eeee", datosMolones);
      console.log(`${doc.id} => ${doc.data()}`);
      //   doc.data.value.mapValue.fields.description
    });
  }

  return <p>aquí listado de eventos</p>;
}
export default EventsList;
