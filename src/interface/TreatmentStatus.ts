export class TreatmentStatus {
  static readonly IN_PROGRESS = new TreatmentStatus('Em andamento', 'primary');
  static readonly FINISHED = new TreatmentStatus('Finalizado', 'success');
  static readonly CANCELED = new TreatmentStatus('Cancelado', 'default');
  static readonly PENDING = new TreatmentStatus('Pendente', 'error');

  private constructor(private readonly name: string, private readonly color: string) {}

  toString() {
    return this.name;
  }
}
