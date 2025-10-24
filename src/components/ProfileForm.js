import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function ProfileForm({ onSave, editingProfile, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    avatar: ''
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (editingProfile) {
      setForm(editingProfile);
      setPreview(editingProfile.avatar || '');
    } else {
      setForm({ name: '', email: '', phone: '', role: '', avatar: '' });
      setPreview('');
    }
  }, [editingProfile]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Name and Email required');
      return;
    }
    onSave(form);
    setForm({ name: '', email: '', phone: '', role: '', avatar: '' });
    setPreview('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-2 mt-2">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765..." />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control name="role" value={form.role} onChange={handleChange} placeholder="Designer / Developer" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mt-3">
        <Form.Label>Upload Your Profile image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <div className="mt-2 text-center">
            <img
              src={preview}
              alt="Preview"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
        )}
      </Form.Group>

      <div className="mt-3 d-flex gap-2">
        <Button type="submit">Save</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </Form>
  );
}
