@extends('layouts.app')

@section('title', 'Data Rawat Jalan')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data Rawat Jalan</h3>
                    <div class="card-tools">
                        <a href="{{ route('rawat-jalan.create') }}" class="btn btn-primary btn-sm">
                            <i class="fas fa-plus"></i> Tambah Data
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <!-- Filter Form -->
                    <form method="GET" action="{{ route('rawat-jalan.index') }}" class="mb-4">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal" name="tanggal" 
                                           value="{{ request('tanggal') }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <select class="form-control" id="status" name="status">
                                        <option value="">Semua Status</option>
                                        @foreach($statusOptions as $key => $value)
                                            <option value="{{ $key }}" {{ request('status') == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="status_bayar">Status Bayar</label>
                                    <select class="form-control" id="status_bayar" name="status_bayar">
                                        <option value="">Semua Status Bayar</option>
                                        @foreach($statusBayarOptions as $key => $value)
                                            <option value="{{ $key }}" {{ request('status_bayar') == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="nama_pasien">Nama Pasien</label>
                                    <input type="text" class="form-control" id="nama_pasien" name="nama_pasien" 
                                           value="{{ request('nama_pasien') }}" placeholder="Cari nama pasien...">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-search"></i> Filter
                                </button>
                                <a href="{{ route('rawat-jalan.index') }}" class="btn btn-secondary">
                                    <i class="fas fa-times"></i> Reset
                                </a>
                            </div>
                        </div>
                    </form>

                    <!-- Data Table -->
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No. Rawat</th>
                                    <th>Tanggal</th>
                                    <th>Jam</th>
                                    <th>Nama Pasien</th>
                                    <th>Dokter</th>
                                    <th>Poli</th>
                                    <th>Status</th>
                                    <th>Status Bayar</th>
                                    <th>Biaya</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($rawatJalan as $index => $item)
                                    <tr>
                                        <td>{{ $rawatJalan->firstItem() + $index }}</td>
                                        <td>{{ $item->no_rawat }}</td>
                                        <td>{{ $item->tgl_registrasi_formatted }}</td>
                                        <td>{{ $item->jam_reg_formatted }}</td>
                                        <td>{{ $item->patient->nm_pasien ?? '-' }}</td>
                                        <td>{{ $item->kd_dokter }}</td>
                                        <td>{{ $item->kd_poli }}</td>
                                        <td>{!! $item->status_badge !!}</td>
                                        <td>
                                            <span class="badge {{ $item->status_bayar == 'Sudah Bayar' ? 'badge-success' : 'badge-warning' }}">
                                                {{ $item->status_bayar }}
                                            </span>
                                        </td>
                                        <td>{{ $item->biaya_reg ? 'Rp ' . number_format($item->biaya_reg, 0, ',', '.') : '-' }}</td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                <a href="{{ route('rawat-jalan.show', $item->no_rawat) }}" 
                                                   class="btn btn-info btn-sm" title="Lihat">
                                                    <i class="fas fa-eye"></i>
                                                </a>
                                                <a href="{{ route('rawat-jalan.edit', $item->no_rawat) }}" 
                                                   class="btn btn-warning btn-sm" title="Edit">
                                                    <i class="fas fa-edit"></i>
                                                </a>
                                                <form action="{{ route('rawat-jalan.destroy', $item->no_rawat) }}" 
                                                      method="POST" style="display: inline-block;"
                                                      onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?')">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button type="submit" class="btn btn-danger btn-sm" title="Hapus">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="11" class="text-center">Tidak ada data</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="d-flex justify-content-center">
                        {{ $rawatJalan->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // Auto submit form when filter changes
    document.getElementById('tanggal').addEventListener('change', function() {
        this.form.submit();
    });
    
    document.getElementById('status').addEventListener('change', function() {
        this.form.submit();
    });
    
    document.getElementById('status_bayar').addEventListener('change', function() {
        this.form.submit();
    });
</script>
@endpush
