import sys
import numpy as np
import matplotlib.pyplot as plt

row = int(sys.argv[1]) 
column = int(sys.argv[2]) 
nx = int(sys.argv[2])
ny = int(sys.argv[1])
dx = int(sys.argv[3])
dy = int(sys.argv[4])

slipDistribution = []
for i in sys.argv[5:]:
    slipDistribution.append(float(i))

float_array = list(map(float, slipDistribution))  # スペースで分割して各要素を浮動小数点数に変換
two_d_array = []
for i in range(row):
    row = float_array[i * column: (i + 1) * column]  # column個の要素をスライスして取得
    two_d_array.append(row)

# 入力されたすべりのデータ
slip = np.array(two_d_array)


# #波数スペクトル行列の行（列）で。波数0が何番目なのかを探索する関数（必須ではない）
def judge(x):
    if(x % 2 == 0):
        return int(x / 2) 
    elif(x % 2 != 0):
        return int((x - 1) / 2)
    
# # x軸方向の波数スペクトルを計算する
kx =2*np.pi* np.fft.fftfreq(slip.shape[1], d=dx) #データ点数28個
modified_kx = np.fft.fftshift(kx)    #波数の列を小さい順にする
kx_spec =np.abs(np.fft.fftshift(np.fft.fft2(slip))) #振幅

# # y軸方向の波数スペクトルを計算する
ky = 2*np.pi*np.fft.fftfreq(slip.shape[0], d=dx) #データ点数10個
modified_ky = np.fft.fftshift(ky)    #波数の列を小さい順にする
ky_spec =np.abs(np.fft.fftshift(np.fft.fft2(slip))) #振幅

print("kx:", len(kx), "modified_kx:", len(modified_kx), "kx_spec:", len(kx_spec),"kx_spec shape:", kx_spec.shape,"nx", nx, "ny",ny)

fig, (ax1, ax2,ax3) = plt.subplots(1,3, figsize=(15, 5))
ax1.plot(modified_kx, kx_spec[judge(ny),:], 'b.-')  
ax1.set_xlabel('kx')
ax1.set_ylabel('amplitude')
ax1.set_title('Wavenumber spectrum along x-axis')
ax1.set_xlim(0, max(modified_kx))

ax2.plot(modified_ky, ky_spec[:,judge(nx)], 'r.-')  
ax2.set_xlabel('ky')
ax2.set_ylabel('amplitude')
ax2.set_title('Wavenumber spectrum along y-axis')
ax2.set_xlim(0, max(modified_ky))


# # 2次元波数スペクトル（の絶対値の自然対数の分布）を描画する
im = ax3.imshow(np.log10(np.abs(np.fft.fftshift(np.fft.fft2(slip)))), cmap='jet', origin="lower",extent=(min(kx), max(kx), min(ky), max(ky)))
ax3.set_xlabel('kx')
ax3.set_ylabel('ky')
ax3.set_title('2D Wavenumber spectrum')
fig.colorbar(im, ax=ax3)
im.autoscale()

fig.savefig('app/javascript/images/figure.png')
plt.close(fig)



#すべり分布の出力
fig, (ax4, ax5) = plt.subplots(1, 2, figsize=(12, 6))
ax4.imshow(slip, cmap='jet')
fig.colorbar(ax4.imshow(slip, cmap='jet'), ax=ax4)
ax4.set_xlabel('x')
ax4.set_ylabel('y')
ax4.set_title("slip")


#波数0で1に規格化された縦方向の波数スペクトルと、横方向の波数スペクトルの出力
#kx_specの規格化：kx=0の列で全体を割る。
#こうすることで、どのkyの場合でも、始まりが1になる。
kx_spec_normalized = kx_spec / kx_spec[:,judge(nx)][:, np.newaxis]
ax5.plot(modified_kx, kx_spec_normalized[judge(ny), :], 'b.-')
ky_spec_normalized = ky_spec / ky_spec[judge(ny),:]
ax5.plot(modified_ky, ky_spec_normalized[:,judge(nx)], 'r.-')
ax5.set_xlabel('wavenumber')
ax5.set_ylabel('amplitude')
ax5.set_title('Normalized Wavenumber spectrum')
ax5.set_xlim(0, max(max(modified_ky), max(modified_kx)))

fig.savefig('app/javascript/images/spectrum_plot.png')
plt.close(fig)