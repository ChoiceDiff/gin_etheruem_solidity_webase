package util

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)

var jwtSecret = []byte("hahaha") //server private key

type Claims struct {
	ID            uint   `json:"id"`
	UserName      string `json:"user_name"`
	Authorization int    `json:"authority"`
	jwt.StandardClaims
}

type EmailClaims struct {
	UserId        uint   `json:"userId"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	OperationType uint   `json:"operarion_type"`
	jwt.StandardClaims
}

//签发token
func GenerateToken(id uint, userName string, authorization int) (string, error) {
	nowTime := time.Now()
	expireTime := nowTime.Add(24 * time.Hour) //过期时间
	claims := Claims{
		ID:            id,
		UserName:      userName,
		Authorization: authorization,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(), //过期时间
			Issuer:    "Orange",          //签发人
		}, //payload
	}
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims) ////header+payload Create a new Token.  Takes a signing method
	token, err := tokenClaims.SignedString(jwtSecret)
	return token, err
}

//验证token
func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}
	return nil, err
}

//生成emailtoken
func GenerateEmailToken(uId, operationType uint, email, password string) (string, error) {
	nowTime := time.Now()
	expireTime := nowTime.Add(24 * time.Hour) //过期时间
	claims := EmailClaims{
		UserId:        uId,
		Email:         email,
		Password:      password,
		OperationType: operationType,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(), //过期时间
			Issuer:    "Orange",          //签发人
		}, //payload
	}
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims) ////header+payload Create a new Token.  Takes a signing method
	token, err := tokenClaims.SignedString(jwtSecret)
	return token, err
}

func ParseEmailToken(token string) (*EmailClaims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &EmailClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*EmailClaims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}
	return nil, err
}
