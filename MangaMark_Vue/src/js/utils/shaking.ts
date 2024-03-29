import Swal from 'sweetalert2'
import '../../assets/css/animate.min.css'

/**
 * Performs a shaking animation on the popup.
 *
 * @return {boolean} Returns false.
 */
export default function shaking(): boolean {
  const popup = Swal.getPopup();
  if (!popup) {
    return false;
  }
  popup.classList.remove('swal2-show');
  setTimeout(() => {
    popup.classList.add('animate__animated', 'animate__headShake');
  });
  setTimeout(() => {
    popup.classList.remove('animate__animated', 'animate__headShake');
  }, 500);
  return false;
}
