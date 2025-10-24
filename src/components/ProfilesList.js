import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProfileCard from './ProfileCard';
import ProfileForm from './ProfileForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

export default function ProfilesList() {
  const [profiles, setProfiles] = useLocalStorage('profiles_v1', []);
  const [editing, setEditing] = useState(null);

  const handleSave = (data) => {
    if (data.id) {
      setProfiles(profiles.map(p => p.id === data.id ? data : p));
      setEditing(null);
    } else {
      const newProfile = { ...data, id: uuidv4() };
      setProfiles([newProfile, ...profiles]);
    }
  };

  const handleEdit = (id) => {
    const p = profiles.find(x => x.id === id);
    if (p) setEditing(p);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this profile?')) {
      setProfiles(profiles.filter(p => p.id !== id));
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col lg={4}>
          <Card className="p-3 sticky-top">
            <h5>{editing ? 'Edit Profile' : 'Add Profile'}</h5>
            <ProfileForm onSave={handleSave} editingProfile={editing} onCancel={() => setEditing(null)} />
          </Card>
        </Col>

        <Col lg={8}>
          <Row xs={1} sm={2} md={2} lg={2} className="g-3">
            {profiles.length === 0 && <p className="text-muted">No profiles yet</p>}
            {profiles.map(profile => (
              <Col key={profile.id}>
                <ProfileCard profile={profile} onEdit={handleEdit} onDelete={handleDelete} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
