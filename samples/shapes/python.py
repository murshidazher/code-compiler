# Inveted Pyramid of Numbers with a given input

rows = int(input("enter number of rows "))
b = 0
for i in range(rows, 0, -1):
    b += 1
    for j in range(1, i + 1):
        print(b, end=' ')
    print('\r')