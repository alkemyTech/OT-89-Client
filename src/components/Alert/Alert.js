import Swal from "sweetalert2";

export const Alert = (title, text, icon) => {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000
    })
  };

  export const Confirm = async (title, text) => {
    const res = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'Ha sido eliminado!',
          'success'
        )
      }
      return result.isConfirmed
    })
    return res;
  };


