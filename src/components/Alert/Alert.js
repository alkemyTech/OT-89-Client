import Swal from "sweetalert2";

export const Alert = (title, text, icon, timeout = 2000) => {
  return Swal.fire({
    position: 'center',
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: timeout
  })
};

export const Confirm = async (title, text,confirmTitle,confirmText,confirmIcon) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      if (confirmTitle && confirmText && confirmIcon) {
      Swal.fire(
        confirmTitle,
        confirmText,
        confirmIcon
      )}
    }
    return result.isConfirmed
  })
};


