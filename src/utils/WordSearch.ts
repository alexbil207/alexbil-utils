export const exist = function (board: string[][], word: string) {
    const row = board.length;
    const col = board[0].length;

    const track = (i: number, j: number, index: number) => {
        if (index === word.length) return true;

        if (i < 0 || i >= row || j < 0 || j >= col || board[i][j] !== word[index]) return false; //borders protection and word validation
        const temp = board[i][j];
        board[i][j] = '#'; //mark as visited to avoid visiting again
        const result =
            track(i + 1, j, index + 1) ||
            track(i - 1, j, index + 1) ||
            track(i, j + 1, index + 1) ||
            track(i, j - 1, index + 1);

        board[i][j] = temp;
        return result;
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (track(i, j, 0)) return true; //start from the beginning 
        }
    }
    return false
};