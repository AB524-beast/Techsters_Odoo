import React, { useState } from 'react';
import '../../CSS/Style.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    profilePhoto: null,
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    profileType: 'private',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('location', formData.location);
      if (formData.profilePhoto) {
        data.append('profilePhoto', formData.profilePhoto);
      }
      data.append('skillsOffered', formData.skillsOffered.split(',').map(s => s.trim()));
      data.append('skillsWanted', formData.skillsWanted.split(',').map(s => s.trim()));
      data.append('availability', formData.availability);
      data.append('profileType', formData.profileType);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      // Optionally, redirect or update UI here

    } catch (error) {
      console.error('Error during registration:', error.message);
      // Optionally, show error message to user
    }
  };

  return (
    <div>
      <h1>User Profile / Signup</h1>
      <form id="profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: *</label><br />
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="email">Email address: *</label><br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="password">Password: *</label><br />
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="location">Location: (optional)</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="profile-photo">Profile Photo: (optional)</label><br />
        <input
          type="file"
          id="profile-photo"
          name="profilePhoto"
          accept="image/*"
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="skills-offered">Skills Offered: *</label><br />
        <textarea
          id="skills-offered"
          name="skillsOffered"
          placeholder="List your skills offered, separated by commas"
          required
          value={formData.skillsOffered}
          onChange={handleChange}
        ></textarea><br /><br />

        <label htmlFor="skills-wanted">Skills Wanted: *</label><br />
        <textarea
          id="skills-wanted"
          name="skillsWanted"
          placeholder="List skills you want to learn, separated by commas"
          required
          value={formData.skillsWanted}
          onChange={handleChange}
        ></textarea><br /><br />

        <label htmlFor="availability">Availability: *</label><br />
        <select
          id="availability"
          name="availability"
          required
          value={formData.availability}
          onChange={handleChange}
        >
          <option value="">Select availability</option>
          <option value="weekdays-mornings">Weekdays Mornings</option>
          <option value="weekdays-afternoons">Weekdays Afternoons</option>
          <option value="weekdays-evenings">Weekdays Evenings</option>
          <option value="weekends-mornings">Weekends Mornings</option>
          <option value="weekends-afternoons">Weekends Afternoons</option>
          <option value="weekends-evenings">Weekends Evenings</option>
          <option value="anytime">Anytime</option>
        </select><br /><br />

        <label>Profile Type:</label><br />
        <input
          type="radio"
          id="public-profile"
          name="profileType"
          value="public"
          checked={formData.profileType === 'public'}
          onChange={handleChange}
        />
        <label htmlFor="public-profile">Public</label><br />
        <input
          type="radio"
          id="private-profile"
          name="profileType"
          value="private"
          checked={formData.profileType === 'private'}
          onChange={handleChange}
        />
        <label htmlFor="private-profile">Private</label><br /><br />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default SignupForm;
