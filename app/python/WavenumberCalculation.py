import sys
import numpy as np

row = int(sys.argv[1])
column = int(sys.argv[2])
slipDistribution = sys.argv[3]

slipDistribution_arr = []
for i in sys.argv[3:]:
    slipDistribution_arr.append(float(i))

float_array = list(map(float, slipDistribution_arr))  # スペースで分割して各要素を浮動小数点数に変換
two_d_array = []
for i in range(row):
    row = float_array[i * column: (i + 1) * column]  # column個の要素をスライスして取得
    two_d_array.append(row)

# 入力されたすべりのデータ
slip = np.array(two_d_array)
print(slip)
