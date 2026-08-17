function Party({ party }) {
  return (
    <div className="route__party">
      {party.avatar ? (
        <span
          className="avatar"
          style={{ background: party.avatar.bg, color: party.avatar.fg }}
        >
          {party.avatar.initial}
        </span>
      ) : (
        <span className={`route__logo${party.bordered ? " route__logo--bordered" : ""}`}>
          <img src={party.logo} alt="" />
        </span>
      )}
      {party.amount && (
        <div className="route__value">
          <p className="route__amount">{party.amount}</p>
          <p className="route__unit">{party.unit}</p>
        </div>
      )}
    </div>
  );
}

/**
 * The slip card used by both confirm and success screens.
 * `variant` = "confirm" (title + warning line) or "success" (green check mark).
 */
export default function Slip({
  variant,
  title,
  subtitle,
  from,
  to,
  amount,
  chip,
  accountName,
  accountId,
  rows,
}) {
  const singleAmount = Boolean(amount);

  return (
    <div className="slip">
      <div className="slip__head">
        {variant === "success" && (
          <img className="slip__mark" src="/assets/success-mark.svg" alt="" />
        )}
        <p className="slip__title">{title}</p>
        {subtitle && <p className="slip__sub">{subtitle}</p>}
      </div>

      <div className="slip__card">
        <div className="route">
          {singleAmount ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <Party party={from} />
                <img className="route__arrow" src="/assets/slip-arrow.svg" alt="ไปยัง" />
                <Party party={to} />
              </div>
              <div className="route__value">
                <p className="route__amount">{amount.value}</p>
                <p className="route__unit">{amount.unit}</p>
              </div>
            </div>
          ) : (
            <>
              <Party party={from} />
              <img className="route__arrow" src="/assets/slip-arrow.svg" alt="ไปยัง" />
              <Party party={to} />
            </>
          )}
        </div>

        <div className="recipient">
          {!singleAmount && <span className="chip">{chip}</span>}
          <div className={`account${singleAmount ? " account--stacked" : ""}`}>
            <span className="account__name">{accountName}</span>
            {!singleAmount && <span className="account__dot">·</span>}
            <span className="account__id">{accountId}</span>
          </div>
        </div>
      </div>

      <img className="perforation" src="/assets/perforation.svg" alt="" />

      <div className="details">
        {rows.map((row) => (
          <div className="details__row" key={row.label}>
            <span className="details__label">{row.label}</span>
            <span className="details__value">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
