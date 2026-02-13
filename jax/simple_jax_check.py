import sys
import numpy as np
import jax
import jax.numpy as jnp

from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QSlider
from PyQt6.QtCore import Qt, QTimer
import pyqtgraph as pg


# -----------------------
# JAX FRF model (JIT)
# -----------------------
def H(Om, alpha, f, z):
    ma = alpha
    ka = alpha * f**2
    ca = 2.0 * z  # scaling with m=k=1
    i = 1j
    w = Om

    a11 = -w**2 + 1.0 + ka + i*w*ca
    a12 = -(ka + i*w*ca)
    a22 = -w**2*ma + ka + i*w*ca

    det = a11*a22 - a12*a12
    return a22 / det  # F=1, k=1 => H=r

def H_primary(Om):
    return 1.0 / (1.0 - Om**2 + 1e-12)

Oms = jnp.linspace(0.5, 1.5, 1200)

@jax.jit
def compute_curves(alpha, f, z):
    amp_primary = jnp.abs(jax.vmap(H_primary)(Oms))
    amp_tmd = jnp.abs(jax.vmap(lambda om: H(om, alpha, f, z))(Oms))
    return amp_primary, amp_tmd


# -----------------------
# PyQt GUI
# -----------------------
class TMDViewer(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("TMD Resonance Curve Viewer (JAX + PyQt6)")

        layout = QVBoxLayout()

        self.plot = pg.PlotWidget()
        self.plot.setLabel("bottom", "Frequency ratio Ω = ω/ω_np")
        self.plot.setLabel("left", "|H(Ω)|")
        self.plot.setLogMode(y=True)   # log scale on y
        self.plot.showGrid(x=True, y=True)

        self.curve_primary = self.plot.plot(pen=None, symbol=None, name="Primary only")
        self.curve_tmd = self.plot.plot(pen=None, symbol=None, name="With TMD")

        layout.addWidget(self.plot)

        # sliders
        self.alpha_slider, self.alpha_label = self.make_slider("mass ratio α", 1, 100, 20)
        self.f_slider, self.f_label = self.make_slider("tuning ratio f", 10, 150, 83)
        self.z_slider, self.z_label = self.make_slider("damping ζ", 0, 200, 40)

        layout.addLayout(self.alpha_slider)
        layout.addLayout(self.f_slider)
        layout.addLayout(self.z_slider)

        self.setLayout(layout)

        self.pending_update = True

        self.timer = QTimer()
        self.timer.timeout.connect(self.update_plot)
        self.timer.start(30)  # ~33 FPS

    def make_slider(self, name, minv, maxv, init):
        row = QHBoxLayout()
        label = QLabel()
        slider = QSlider(Qt.Orientation.Horizontal)
        slider.setMinimum(minv)
        slider.setMaximum(maxv)
        slider.setValue(init)
        slider.valueChanged.connect(lambda _: self.request_update())

        row.addWidget(QLabel(name))
        row.addWidget(slider)
        row.addWidget(label)
        return row, label

    def request_update(self):
        self.pending_update = True

    def get_params(self):
        # scale sliders -> physical params
        alpha = self.findChild(QSlider, None)  # not used
        # directly read in the same order we created:
        sliders = self.findChildren(QSlider)

        alpha = sliders[0].value() / 100.0     # 0.01..1.00
        f = sliders[1].value() / 100.0         # 0.10..1.50
        z = sliders[2].value() / 1000.0        # 0.000..0.200

        return alpha, f, z

    def update_plot(self):
        if not self.pending_update:
            return
        self.pending_update = False

        sliders = self.findChildren(QSlider)
        alpha = sliders[0].value() / 100.0
        f = sliders[1].value() / 100.0
        z = sliders[2].value() / 1000.0

        # update labels
        self.alpha_label.setText(f"{alpha:.3f}")
        self.f_label.setText(f"{f:.3f}")
        self.z_label.setText(f"{z:.4f}")

        amp_p, amp_t = compute_curves(alpha, f, z)

        # JAX array -> numpy
        x = np.array(Oms)
        y1 = np.array(amp_p)
        y2 = np.array(amp_t)

        self.curve_primary.setData(x, y1)
        self.curve_tmd.setData(x, y2)


# -----------------------
# run
# -----------------------
app = QApplication(sys.argv)
w = TMDViewer()
w.resize(900, 600)
w.show()
sys.exit(app.exec())
