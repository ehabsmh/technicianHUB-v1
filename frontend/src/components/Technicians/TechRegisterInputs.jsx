export default function TechRegisterInputs(props) {
  // eslint-disable-next-line react/prop-types
  const { createUser } = props;

  return (
    <>
      <div className="technician-details duration-300 relative">
        <h4 className="mb-4 mt-5 nunito-medium text-xl">Technician Details</h4>
        <label htmlFor="services">Services</label>
        <select
          name="service"
          id="service"
          required
          className="register-inputs"
          onChange={createUser}
        >
          <option value="plumber">Plumber</option>
          <option value="air conditions technician">
            Air conditions technician
          </option>
          <option value="fridges technician">Fridges technician</option>
        </select>
        <input
          type="number"
          required
          placeholder="salary"
          className="register-inputs"
          name="salary"
          onChange={createUser}
        />
        <textarea
          type="number"
          required
          minLength={20}
          placeholder="Bio"
          className="register-inputs"
          name="bio"
          onChange={createUser}
        />
      </div>
    </>
  );
}
