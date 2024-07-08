document.addEventListener('DOMContentLoaded', function() {
    cargarUsuarios();
    document.getElementById('formUsuario').addEventListener('submit', agregarUsuario);
});

async function cargarUsuarios() {
    try {
        const response = await fetch('https://backend-t4xr.onrender.com/api/users'); // URL completa
        if (!response.ok) {
            throw new Error('Error al cargar usuarios');
        }
        const usuarios = await response.json();
        const tablaUsuarios = document.getElementById('tablaUsuarios');
        tablaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.dni}</td>
                <td>
                    <button class="btn btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </td>
            `;
            tablaUsuarios.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar usuarios');
    }
}

async function agregarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;

    try {
        const response = await fetch('https://backend-t4xr.onrender.com/api/users', { // URL completa
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido, dni }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar usuario');
        }

        document.getElementById('formUsuario').reset();
        cargarUsuarios();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar usuario');
    }
}

async function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        try {
            const response = await fetch(`https://backend-t4xr.onrender.com/api/users/${id}`, { // URL completa
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar usuario');
            }

            cargarUsuarios();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    }
}
