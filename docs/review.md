# Review and verification / October 17, 2026

Actual source recovered from the existing private Site; the GitHub repository previously held only a README. No paid inference or resource creation. Existing Site audience is preserved.

## Corrected behavior
Policy import validates all fields and agent identity before changing any learner state. Rejected malformed counters, hyperparameters, histories and Q tables leave the learner unchanged. Actual Q learning still runs in a local browser worker. Evaluation now reports a separately computed breadth-first shortest route and explicitly labels repeated same-map/same-start rollouts; this is not unseen-map generalization.

Actual tests train three profiles across three maps from empty tables, compare before/after, verify collisions, policy restoration, malformed import atomicity and shortest-route bounds. All nine trained policies extract in 30/30 same-map evaluation episodes; no claim about real-world/general game intelligence. Commands: npm test; npm run build; npm start.
