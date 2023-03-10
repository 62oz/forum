package database

import (
	"database/sql"
	"fmt"
	u "forum/server/utils"
	"time"
)

// Get posts
func GetPosts(db *sql.DB) []u.Post {
	rows, err := db.Query(`SELECT * FROM Posts`)
	if err != nil {
		fmt.Println("Get posts Query error:", err)
		return nil
	}
	defer rows.Close()

	var AllPosts []u.Post

	for rows.Next() {
		var p u.Post
		err = rows.Scan(&p.ID, &p.AuthorID, &p.Title, &p.Content, &p.Date, &p.CategoryIDs, &p.Categories)
		if err != nil {
			fmt.Println("Get posts Scan error:", err)
			continue
		}
		AllPosts = append(AllPosts, p)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get posts rows error:", err)
		return nil
	}
	return AllPosts
}

// Get posts by author
func GetPostsByAuthor(db *sql.DB, id int) []u.Post {
	rows, err := db.Query(`SELECT * FROM Posts WHERE AuthorID = ?`, id)
	if err != nil {
		fmt.Println("Get posts by author Query error:", err)
		return nil
	}
	defer rows.Close()

	var AllPosts []u.Post

	for rows.Next() {
		var p u.Post
		err = rows.Scan(&p.ID, &p.AuthorID, &p.Title, &p.Content, &p.Date, &p.CategoryIDs, &p.Categories)
		if err != nil {
			fmt.Println("Get posts Scan error:", err)
			continue
		}
		AllPosts = append(AllPosts, p)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Get posts rows error:", err)
		return nil
	}
	return AllPosts
}

// Get post by ID
func GetPostByID(db *sql.DB, id int) u.Post {
	var p u.Post
	rows, err := db.Query(`SELECT * FROM Posts WHERE ID = ?`, id)
	if err != nil {
		fmt.Println("Get post by ID Query error:", err)
		return p
	}
	err = rows.Scan(&p.ID, &p.AuthorID, &p.Title, &p.Content, &p.Date, &p.CategoryIDs, &p.Categories)
	if err != nil {
		fmt.Println("Get post by ID Scan error:", err)
		return p
	}
	return p
}

// Insert post wohoo
func InsertPost(db *sql.DB, p u.Post) {
	t := time.Now().Unix()
	statement, err := db.Prepare("INSERT OR IGNORE INTO Posts (AuthorID, Title, Content, Date, CategoryIDs, Categories) VALUES (?, ?, ?, ?, ?, ?)")
	if err != nil {
		fmt.Println("Insert post Prepare error:", err)
		return
	}
	defer statement.Close()

	_, err = statement.Exec(p.AuthorID, p.Title, p.Content, t, p.CategoryIDs, p.Categories)
	if err != nil {
		fmt.Println("Insert post Execute stmt error:", err)
		return
	}
}
