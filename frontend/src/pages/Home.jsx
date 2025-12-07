import React, { useState, useEffect } from "react";
import { list } from "../api/client";
import { Link } from "react-router-dom";
import image from "../images/banner.jpg";
const initialFetchState = {
  data: [],
  isLoading: true,
  error: null,
};

export default function Home() {
  const [fetchState, setFetchState] = useState(initialFetchState);

  useEffect(() => {
    setFetchState((prev) => ({ ...prev, isLoading: true, error: null }));

    list()
      .then((articlesData) => {
        setFetchState({
          data: articlesData,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setFetchState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load articles. Please try again.",
        }));
      });
  }, []);

  const { data: articles, isLoading, error } = fetchState;

  if (isLoading) {
    return <div className="loading-state">✨ Loading Articles...</div>;
  }

  if (error) {
    return <div className="error-state">⚠️ Error: {error}</div>;
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="empty-state">
        <p>😔 No articles found. Time to create some!</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="main-title">📰 Latest Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="article-card-link"
          >
            <article className="article-card">
              <h2 className="article-title ">{article.title}</h2>
              <img src={image} alt="Article Visual" className="article-image" />
              <p className="article-meta">
                Published:{" "}
                {article.generatedAt
                  ? new Date(article.generatedAt).toLocaleString()
                  : "N/A"}
              </p>
              <span className="read-more-link">Read Article →</span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
