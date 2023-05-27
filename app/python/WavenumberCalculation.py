import sys
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

row = int(sys.argv[1])
column = int(sys.argv[2])
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
print(slip)

nx = column
ny = row


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


# #出力する
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


# 2次元波数スペクトル（の絶対値の自然対数の分布）を描画する
im = ax3.imshow(np.log10(np.abs(np.fft.fftshift(np.fft.fft2(slip)))), cmap='jet', origin="lower",extent=(min(kx), max(kx), min(ky), max(ky)))
ax3.set_xlabel('kx')
ax3.set_ylabel('ky')
ax3.set_title('2D Wavenumber spectrum')
fig.colorbar(im, ax=ax3)
im.autoscale()
plt.show()

#すべり分布の出力
plt.imshow(slip, cmap='jet')
plt.colorbar()
plt.xlabel('x')
plt.ylabel('y')
plt.title("slip")
plt.show()


#波数0で1に規格化された縦方向の波数スペクトルと、横方向の波数スペクトルの出力
#kx_specの規格化：kx=0の列で全体を割る。
#こうすることで、どのkyの場合でも、始まりが1になる。
kx_spec_normalized = kx_spec / kx_spec[:,judge(nx)][:, np.newaxis] 
plt.plot(modified_kx,kx_spec_normalized[judge(ny),:], 'b.-')  

#ky_specの規格化：ky=0の行で割る
ky_spec_normalized = ky_spec / ky_spec[judge(ny),:]
plt.plot(modified_ky, ky_spec_normalized[:,judge(nx)], 'r.-')  

plt.xlabel('wavenumber')
plt.ylabel('amplitude')
plt.title('Normalized Wavenumber spectrum ')
plt.xlim(0, max(max(modified_ky), max(modified_kx)))
plt.show()
