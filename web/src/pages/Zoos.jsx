import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Button from "../components/Button";
import { mockApi } from "../api/mock";

export default function Zoos() {
  const [zoos, setZoos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await mockApi.listZoos();
      setZoos(res.zoos || []);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <NavBar />

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Select a Wildlife Sanctuary</h1>
          <p className="mt-2 text-slate-300">Choose where you want to visit. Location is shown for navigation.</p>
        </div>
        <Link to="/my-bookings">
          <Button variant="ghost">View My Bookings</Button>
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 text-slate-300">Loading zoos...</div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {zoos.map((z) => (
            <Card key={z.id} className="relative overflow-hidden">
              <div className="absolute inset-0 -z-10 opacity-30">
                <div className="h-full w-full bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/20 to-cyan-500/20" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-bold">{z.name}</div>
                  <div className="mt-1 text-sm text-slate-200">{z.address}</div>
                  <div className="mt-2 text-xs text-slate-300">
                    Lat: {z.lat}, Lng: {z.lng}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a href={z.mapsUrl} target="_blank" rel="noreferrer">
                    <Button variant="ghost">Open Maps</Button>
                  </a>
                  <Link to={`/book/${z.id}`}>
                    <Button>Book Visit</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}