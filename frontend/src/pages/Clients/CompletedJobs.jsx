import { useContext, useEffect, useState } from "react";
import TechnicianContext from "../../components/Global/Store";
import axios from "axios";

export default function CompletedJobs() {
  const technician = useContext(TechnicianContext);
  const [completedJobs, setCompletedJobs] = useState(null);
  console.log(technician._id);
  const getCompletedJobs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/technicians/${technician._id}/completedJobs`,
        { headers: { token: localStorage.getItem("token") } }
      );
      setCompletedJobs(data.completedJobs);
      console.log(data.completedJobs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCompletedJobs();
  }, []);

  return (
    <section id="completed-jobs" className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Completed Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedJobs?.map(({ jobDetails }, i) => {
            return (
              <div className="bg-white p-6 rounded-lg shadow-md" key={i}>
                <h3 className="text-xl font-semibold mb-2">
                  {jobDetails.title}
                </h3>
                <p className="text-gray-600">{jobDetails.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
