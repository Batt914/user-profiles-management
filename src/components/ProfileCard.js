import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ProfileCard({ profile, onEdit, onDelete }) {
  return (
    <Card className="mb-3 h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <img
            src={profile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`}
            alt="avatar"
            style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }}
            className="me-3"
          />
          <div>
            <Card.Title className="mb-0">{profile.name}</Card.Title>
            <small className="text-muted">{profile.role || 'User'}</small>
          </div>
        </div>

        <Card.Text className="flex-grow-1">
          <div><strong>Email:</strong> {profile.email}</div>
          <div><strong>Phone:</strong> {profile.phone}</div>
        </Card.Text>

        <div className="d-flex justify-content-between">
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(profile.id)}>Edit</Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(profile.id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
