import React, { useState, useEffect } from "react";
import { get } from "../api/client";
import { useParams, Link } from "react-router-dom";

const initialFetchState = {
  data: null,
  isLoading: true,
  error: null,
};

export default function Article() {
  const { id } = useParams();
  const [fetchState, setFetchState] = useState(initialFetchState);

  useEffect(() => {
    setFetchState((prev) => ({ ...prev, isLoading: true, error: null }));

    get(id)
      .then((articleData) => {
        setFetchState({
          data: articleData,
          isLoading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.error(`Failed to fetch article ${id}:`, err);
        setFetchState((prev) => ({
          ...prev,
          isLoading: false,
          error: `Could not load article ID: ${id}. It may have vanished.`,
        }));
      });
  }, [id]);

  const { data: article, isLoading, error } = fetchState;

  if (isLoading) {
    return (
      <div className="article-loading">
        <p>🪄 Loading Article Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-error">
        <p>⚠️ Error: {error}</p>
        <Link to="/" className="back-link-error">
          ← Return
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found">
        <p>💀 Article Not Found. This story has disappeared.</p>
        <Link to="/" className="back-link-not-found">
          ← Back to safety
        </Link>
      </div>
    );
  }

  return (
    <article className="article-page">
      <Link to="/" className="back-link">
        ← Back to home
      </Link>

      <header className="article-header">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          <p className="article-author">
            By: {article.author || "A Human Writer (Probably)"}
          </p>
          <p className="article-date">
            Published: {article.date || new Date().toDateString()}
          </p>
          <div className="article-tags">
            {article.tags?.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="article-content">
        <div
          className="article-body-html"
          // TODO: Sanitize HTML in a real app to prevent XSS attacks
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </section>

      <footer className="article-footer">
        <Link to="/" className="back-link-bottom">
          Return to the front page
        </Link>
      </footer>
    </article>
  );
}
