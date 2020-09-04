def monotoneIncreasingDigits(N):
    S = list(str(N))
    i = 1
    while i < len(S) and S[i-1] <= S[i]:
        i += 1
    while 0 < i < len(S) and S[i-1] > S[i]:
        S[i-1] = str(int(S[i-1]) - 1)
        i -= 1
    S[i+1:] = '9' * (len(S) - i-1)
    return int("".join(S))
print(monotoneIncreasingDigits(998))