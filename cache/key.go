package cache

import (
	"fmt"
	"strconv"
)

const RankKey = "Rank"

func ProductViewKey(id uint) string {
	return fmt.Sprintf("view product:%s", strconv.Itoa(int(id)))
	//Sprintf formats according to a format specifier and returns the resulting string.
}
