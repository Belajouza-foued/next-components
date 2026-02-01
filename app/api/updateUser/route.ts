import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const body = await request.json(); // { id, name, email }
    const { id, ...updateData } = body;

    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la mise à jour du user' },
      { status: 500 }
    );
  }
}
